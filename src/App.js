//Import Modules
import React, {useState, useEffect} from 'react';
import Axios from 'axios';
//Import Stylesheets
import './Styles/App.css';
//Import Components
import Form from './Components/Form';
import CouponList from './Components/CouponList';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Infobox from './Components/Infobox';

//Main Component
function App() {

  //State Hooks
  //Data Hooks
  const [shopName, setShopName] = useState('');
  const [couponValue, setCouponValue] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [description, setDescription] = useState('');
  const [multipleTimes, setMultipleTimes] = useState(false);
  const [couponList, setCouponList] = useState([]);
  const [date, setDate] = useState(new Date(9999,1,1));
  //UI Hooks
  const [couponLink, setLink] = useState('');
  const [isActive, setActive] = useState(false);
  const [infoActive, setInfoActive] = useState(false);
  const [flipActive, setFlipActive] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [listHeading, setListHeading] = useState("Finde dein Schnäppchen...");

  //Show and Hide the Form and flip the Button
  const handleToggle = () => {
  setActive(!isActive);
  setFlipActive(!flipActive);
  };
  
  //Effect Hook which is executed at page load 
  useEffect(()=>{ 
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true); //If Users System Color is in "Dark Mode", set Dark Mode true
    }
    Axios.get("https://skimp-coupons.herokuapp.com/read").then((response)=>{ //Send request to route in backend
    let allCoupons = response.data;
    allCoupons.sort((a,b) => a.shopName.localeCompare(b.shopName)); //Sort alphabetacally
    setCouponList(allCoupons); //Handle data from the response
    });
  },[]); //Start useEffect Hook as soon as page loads

  return (
    <div className="App" data-theme={darkMode ? "dark" : "light"}>
      <Header infoActive={infoActive} setInfoActive={setInfoActive} isActive={isActive} darkMode={darkMode} setDarkMode={setDarkMode}/>
      <Infobox infoActive={infoActive} setInfoActive={setInfoActive}/>
      <Form isActive={isActive} setActive={setActive} flipActive={flipActive} setFlipActive={setFlipActive}
      shopName={shopName} setShopName={setShopName} couponCode={couponCode} setCouponCode={setCouponCode}
      description={description} setDescription={setDescription} multipleTimes={multipleTimes} setMultipleTimes={setMultipleTimes}
      couponList={couponList} setCouponList={setCouponList} setCouponValue={setCouponValue} 
      couponValue={couponValue} setLink={setLink} couponLink={couponLink} date={date} setDate={setDate} setListHeading={setListHeading}
      />
      <CouponList infoActive={infoActive} isActive={isActive} couponList={couponList} setCouponList={setCouponList} listHeading={listHeading}/>
      <button className={`openFormButton ${infoActive ? "blur" : ""}`} onClick={handleToggle}>
        <div id="flip-button-inner" className={flipActive? "flip" : ""}>
          <div className="flip-button-front"><ion-icon name="add-outline"></ion-icon></div>
          <div className="flip-button-back"><ion-icon name="close-outline"></ion-icon></div>
        </div>
      </button>
      <Footer isActive={isActive} infoActive={infoActive}/>
    </div>
  );
}

export default App; //Export Component
