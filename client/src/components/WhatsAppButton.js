import React, { useState } from "react";
import "./WhatsAppButton.css";
import logo from "./Digital_Glyph_White.png";

const WhatsAppButton = ({ phoneNumber }) => {
const [showPopup, setShowPopup] = useState(false);
  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=מה נשמע?`);
  };
  
  return (
    <div className="WhatsAppButtonContainer">
      <button 
        onClick={handleClick}
        onMouseEnter={() => setShowPopup(true)}
        onMouseLeave={() => setShowPopup(false)} 
        className="WhatsAppButton">
      <img src={logo} alt="WhatsApp logo" className="WhatsAppLogo" />
      </button>
      {showPopup && (
        <div className="Popup">
          <div className="PopupArrow" />
          <div className="PopupMessage">נשמח לעזור</div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppButton;
