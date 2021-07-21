//Import Modules
import React,{useState} from 'react';
//Import Components
import Coupon from './Coupon';

//Coupon List Component
const CouponList = ({infoActive, isActive, couponList, setCouponList, listHeading}) =>{

    //State Hook for Search Input Field
    const [searchTerm, setSearchTerm] = useState('');

    return(
        <div className={`couponList ${isActive||infoActive ? "blur" : ""}`}>
            <div className="listHeader">
            <h3 className="listHeading" id="listHeading">{listHeading}</h3>
            <input className="searchField" type="text" placeholder="Suchen..." onChange={(event)=>setSearchTerm(event.target.value)}/>
            </div>
            
            {couponList.filter((val)=>{
                if(searchTerm==""){ 
                    return val; //Return all Coupons with empty String in Search Field
                } else if(val.shopName.toLowerCase().includes(searchTerm.toLowerCase()) || //Shop Name
                val.description.toLowerCase().includes(searchTerm.toLowerCase())){ //Category
                    return val; //Return all Coupons with specific string from the Search Input
                }
            }).map((val, key)=>{
                return(
                    <Coupon val={val} key={key} couponList={couponList} setCouponList={setCouponList}/>
                );
            })}
        </div>
    );
}

export default CouponList; //Export Component