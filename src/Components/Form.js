//Import Modules
import React from 'react';
import Axios from 'axios';
import {useForm} from 'react-hook-form';
//Import Stylesheets
import '../Styles/Form.css';

//Input Form Component
const Form = ({setFlipActive, setActive, isActive, shopName, setShopName, couponCode, setCouponCode, description, setDescription, multipleTimes, setMultipleTimes, couponList, setCouponList, couponValue, setCouponValue, couponLink, setLink, date, setDate, setListHeading}) =>{

    //Add Coupon to the Database in the backend
    const addToList = ()=>{  
        Axios.post("https://skimp-coupons.herokuapp.com/add", //Send post request with JSON Object to the route in backend
        {shopName: shopName, couponCode: couponCode, description: description, multipleTimes: multipleTimes, couponValue: couponValue, couponLink: couponLink, date:date, useCount: 0}).then((response)=>{
            setCouponList([...couponList, {_id: response.data._id, shopName: shopName, couponCode: couponCode, description: description, multipleTimes: multipleTimes, couponValue: couponValue, couponLink:couponLink, date:new Date(9999,1,1)}]);
          });
    };

    //Form Validation
    const {register,handleSubmit,formState: { errors }} = useForm();
        const onSubmit = () => {
        addToList(); //Send the coupon to Database with valid inputs
        clearForm(); //Clear and close the From
        changeHeading();
    }; 
    
    //Clear and Close the Form after adding a Coupon
    const clearForm = () =>{
        setActive(false);
        setFlipActive(false);
        setShopName('');
        setLink('');
        setDescription('');
        setCouponValue('');
        setCouponCode('');
        setMultipleTimes(false);
        setDate(new Date(9999,1,1));
    };
    
    //Change the List Heading
    const changeHeading = () =>{
        setListHeading("Danke für die Unterstützung");
    }
    
    return(
        <div className={`formBox ${isActive ? "openBlur" : ""}`}>
        <form className={`inputForm ${isActive ? "open" : ""}`}>
            <div className="fieldbox">
                <input {...register("shopName", {required: true})} type="text" className="inputfield"  value={shopName} onChange={(event)=>{setShopName(event.target.value)}} required autoComplete="off" />
                <label className="fieldLabel">Shop</label>
                {errors?.shopName?.type === "required" && <p className="error-msg">Bitte geben Sie den Shop ein</p>}
            </div>
            <div className="fieldbox">
                <input {...register("couponValue", {required: true})} type="text" className="inputfield" value={couponValue} onChange={(event)=>{setCouponValue(event.target.value)}} required autoComplete="off" />
                <label className="fieldLabel">Betrag (€/%)</label>
                {errors?.couponValue?.type === "required" && <p className="error-msg">Bitte geben Sie einen Betrag in € o. % ein</p>}
            </div>
            <div className="fieldboxfull">
                <input {...register("couponCode", {required: true})} type="text" className="inputfield" value={couponCode} onChange={(event)=>{setCouponCode(event.target.value)}} required autoComplete="off"/>
                <label className="fieldLabel">Code</label>
                {errors?.couponCode?.type === "required" && <p className="error-msg">Bitte geben Sie einen Couponcode ein</p>}
            </div>
            <div className="fieldbox">
                <input type="text" className="inputfield" value={description} onChange={(event)=>{setDescription(event.target.value)}} required/>
                <label className="fieldLabel">Kategorie</label>
            </div>
            <div className="fieldbox">
                <input type="text" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} className="inputfield" onChange={(event)=>{setDate(event.target.value)}} required/>
                <label className="fieldLabel">Einlösbar bis...</label>
            </div>
            <div className="fieldboxfull">
                <input type="text" className="inputfield" onChange={(event)=>{setLink(event.target.value)}} required/>
                <label className="fieldLabel">Shop Link</label>
            </div>
            <div className="row">
                <span>Mehrfach einlösbar</span>
                <label className="checkbox bounce">
                <input type="checkbox" onClick={(event)=>{setMultipleTimes(event.target.checked)}}/>
                    <svg viewBox="0 0 21 21">
                        <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                    </svg>
                </label>
            </div>
            <button className="submitButton" onClick={handleSubmit(onSubmit)}>Hinzufügen</button>
        </form>
        </div>   
    );
};

export default Form; //Export Component
