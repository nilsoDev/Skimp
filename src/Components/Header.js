//Import Modules
import React from 'react';
import {useState} from 'react';
//Import Stylesheets
import '../Styles/Header.css';

//Header Component
const Header = ({infoActive, setInfoActive, isActive, darkMode, setDarkMode}) =>{

    //State Hook for Dark Mode
    const [visibility, setVisibility] = useState(false);

    //Toggle Dark Mode 
    const toggleDarkMode = () =>{ 
        setDarkMode(darkMode ? false : true);
        setVisibility(visibility ? false : true);
    };

    //Open Infobox
    const toggleInfobox = () =>{
        setInfoActive(infoActive ? false : true);
    };

    return(
        <header className={`headerBox ${isActive||infoActive ? "blur" : ""}`} >
            <div className="logo"></div>
            <nav>
                <ul>
                    <li onClick={toggleDarkMode}>
                        <span className={`headerIconDark ${visibility ? "" : "hideIcon"}`}><ion-icon  name="moon-outline"></ion-icon></span>
                    </li>
                    <li onClick={toggleDarkMode}>
                        <span className={`headerIconLight ${visibility ? "hideIcon" : ""}`}><ion-icon name="sunny-outline"></ion-icon></span>
                    </li>
                    <li onClick={toggleInfobox} className="helpIcon"><ion-icon name="help-outline"></ion-icon></li>
                </ul>  
            </nav>
        </header>
    );
};

export default Header; //Export Component