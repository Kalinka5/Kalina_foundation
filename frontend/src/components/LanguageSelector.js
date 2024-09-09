import React, { useState } from "react";
import i18n from "../i18n";

import UA_flag from "../img/UA-flag.png";
import UK_flag from "../img/UK-flag.png";

import "../styles/languageSelector.css";

const LanguageSelector = () => {
  const [selectedLang, setSelectedLang] = useState("ua");

  const handleLanguageChange = (e) => {
    e.preventDefault(); // Prevent default link behavior
    const newLang = e.target.getAttribute("data-lang"); // Get the language code from the data attribute
    setSelectedLang(newLang);
    i18n.changeLanguage(newLang);
  };

  // Determine the display name and flag based on the selected language
  const languageDisplayName = selectedLang === "ua" ? "UA" : "EN";
  const flagImage = selectedLang === "ua" ? UA_flag : UK_flag;

  return (
    <div className="lang-menu">
      <div className="selected-lang">
        <img src={flagImage} alt={languageDisplayName} className="flag-img" />
        {languageDisplayName}
      </div>
      <ul className="languages">
        <li>
          <button className="ua" onClick={handleLanguageChange} data-lang="ua">
            UA
          </button>
        </li>
        <li>
          <button className="en" onClick={handleLanguageChange} data-lang="en">
            EN
          </button>
        </li>
      </ul>
    </div>
  );
};

export default LanguageSelector;
