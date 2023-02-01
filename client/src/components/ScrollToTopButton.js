import React, { useState, useEffect } from "react";
import './ScrollToTopButton.css'

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div
      className={`ScrollToTopButton ${
        showButton ? "ScrollToTopButton--show" : ""
      }`}
      onClick={handleClick}
    >
      <i className="fa fa-arrow-up" />
    </div>
  );
};

export default ScrollToTopButton;
