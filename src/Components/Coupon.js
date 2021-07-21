//Import Modules
import React from 'react';
import {useState} from 'react';
import Axios from 'axios';
import moment from 'moment';

//Coupon Component
const Coupon = ({val}) =>{
  
  //State Hooks
  const [isActive, setActive] = useState(false);
  const [hide, setHide] = useState(false);

  //Copy the Coupon-Code to the Clipboard
  const copyToClipboard = () =>{
    var copie = JSON.stringify(val.couponCode);
    navigator.clipboard.writeText(copie.replace(/\"/g, ""));
  };

  //Add Class to show Coupon Code and the Copy-Button in the UI
  const handleToggle = () => {
    setActive(!isActive);
  };

  //Add Class to show Hide the Button in the UI
  const hideButton = () => {
    setHide(true);
  };

  //Parse the Date Object to String and change the Format
  moment.locale(); //DE
  var showDate;
  var unparsedDate = val.date;
  const unparsedCompareDate = new Date(9999,1,1);
  var compareDate = moment(unparsedCompareDate).format('ll'); 
  var parsedDate = moment(unparsedDate).format('ll');  
  if(parsedDate!==compareDate){
    showDate = parsedDate;
  }else{showDate="";}


  //Use Coupon and delete it in the DB if you can´t use it more than once
  const cashCoupon = (id) =>{
      handleToggle();
      hideButton();
      if(val.multipleTimes === false){
        Axios.delete(`https://skimp-coupons.herokuapp.com/delete/${id}`);
      } else{
        Axios.put(`https://skimp-coupons.herokuapp.com/countAdd/${id}`);
      }
  };

  return(
    <div className="wrapper">
      <div className="innerWrapper">
      <div className="couponBox">
          <a href={val.couponLink}><h3 className="shopName">{val.shopName}</h3></a>
          <div className="infoBox">
            <p className="couponValue">{val.couponValue}</p>
            <p className="category">{val.description}</p>
            <p className="maxDate">{showDate}</p>
          </div>
          <div className="codeBox">
            <button className={`redeemButton ${hide ? "hide" : ""}`} onClick={()=>{cashCoupon(val._id)}}>Einlösen</button>
            <p className={`couponCode ${isActive ? "showCoupon" : ""}`}>{val.couponCode}</p>
            <span className={`copyIcon ${isActive ? "showIcon" : ""}`} ><ion-icon name="copy-outline" onClick={copyToClipboard}></ion-icon></span> 
          </div>
        </div>
      </div>
    </div>
    );
};

export default Coupon; //Export Component