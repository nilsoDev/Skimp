//Import Modules
import React from 'react';
//Import Stylesheets
import '../Styles/Infobox.css';

//Infobox Component
const Infobox = ({infoActive, setInfoActive}) =>{

    //Close Infobox
    const toggleInfobox = () =>{
        setInfoActive(infoActive ? false : true);
    };

    return(
        <div className={`helpBoxWrapper ${infoActive ? "openInfo" : ""}`}>
            <div className="helpBox">
                <button className="closeButton" onClick={toggleInfobox}><ion-icon name="close-outline"></ion-icon></button>
                <h4>Skimp...</h4>
                <p>...ist eine Plattform zum Austauschen personlisierter Rabattcodes.
                Mit dem Kauf von Produkten erhält man oft personalisierte Coupons, für die man aber selbst keine 
                Verwendung hat. Mit Skimp kannst du nun anderen die Möglichkeit geben, diese Coupons zu verwenden 
                und so Geld zu sparen.</p>
                <p><span className="subHeading">Du möchtest einen Coupon oder Gutschein teilen?</span><br/>
                Dann klicke einfach auf den Button mit dem „+“ und gebe die wichtigsten Informationen in 
                die Formularfelder ein.</p>
                <p><span className="subHeading">Du bist selbst auf der Suche nach Rabattcodes?</span><br/>
                Dann scrolle einfach duch die Coupon-Liste oder suche den gewünschten Shop über die Suchleiste.</p>
            </div>
        </div>
    );
}

export default Infobox;//Export Component