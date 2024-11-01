import React, { useState } from "react";
import i18n from "../i18n";

import { useMediaQuery } from "@uidotdev/usehooks";

import UA_flag from "../img/UA-flag.png";
import UA_flag_mobile from "../img/UA-flag_mobile.png";
import UK_flag from "../img/UK-flag.png";
import UK_flag_mobile from "../img/UK-flag_mobile.png";

import "../styles/languageSelector.css";

const LanguageSelector = () => {
  const savedLang = localStorage.getItem("i18nextLng") || "ua";
  const [selectedLang, setSelectedLang] = useState(savedLang);

  const isPhoneDisplay = useMediaQuery(
    "only screen and (min-width: 300px) and (max-width: 600px)"
  );

  const handleLanguageChange = (e) => {
    e.preventDefault(); // Prevent default link behavior
    const newLang = e.target.getAttribute("data-lang");
    setSelectedLang(newLang);
    i18n.changeLanguage(newLang);
    localStorage.setItem("i18nextLng", newLang);
  };

  // Determine the display name and flag based on the selected language
  const languageDisplayName = selectedLang === "ua" ? "UA" : "EN";
  const flagImage = selectedLang === "ua" ? UA_flag : UK_flag;
  const flagImageMobile =
    selectedLang === "ua" ? UA_flag_mobile : UK_flag_mobile;

  return (
    <div className="lang-menu">
      <div className="selected-lang">
        <img
          src={flagImage}
          srcSet={flagImageMobile}
          alt={languageDisplayName}
          className="flag-img"
        />
        {!isPhoneDisplay && languageDisplayName}
        <div className="arrow">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M24 24H0V0h24v24z" opacity=".87"></path>
            <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"></path>
          </svg>
        </div>
      </div>
      <ul className="languages">
        <li>
          <button className="ua" onClick={handleLanguageChange} data-lang="ua">
            <b>UA</b>
          </button>
        </li>
        <li>
          <button className="en" onClick={handleLanguageChange} data-lang="en">
            <b>EN</b>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default LanguageSelector;
