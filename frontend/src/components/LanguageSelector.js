import React from "react";

import i18n from "../i18n";

import { useMediaQuery } from "@uidotdev/usehooks";

import Select from "react-select";

import flagUA from "../img/UA-flag.png";
import flagUK from "../img/UK-flag.png";

import "../styles/languageSelector.css";

// Options of Network Selection React Component
const options = [
  { value: "en", label: "en", icon: flagUK },
  { value: "ua", label: "ua", icon: flagUA },
];

// Styles for React Select Component (Network Eth or BNB)
const customStylesMobile = {
  container: (provided) => ({
    ...provided,
    height: "auto",
    fontSize: "14px", // Adjust font size for mobile
  }),
  control: (provided, state) => ({
    ...provided,
    minHeight: "30px", // Adjust control height for mobile
    border: state.isFocused ? "2px solid #0a4ebb" : "1px solid #ccc",
    boxShadow: "none",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "2px 8px", // Adjust padding for smaller height
  }),
  singleValue: (provided) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    fontSize: "12px", // Smaller font size
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: "4px", // Adjust padding for smaller height
  }),
  option: (provided) => ({
    ...provided,
    fontSize: "12px", // Smaller font size for options
    padding: "5px 10px", // Adjust padding
    display: "flex",
    alignItems: "center",
  }),
};
const customStyles = {
  option: (provided) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
  }),
  singleValue: (provided) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
  }),
};

const LanguageSelector = () => {
  const savedLang = localStorage.getItem("i18nextLng") || "ua";

  const isPhoneDisplay = useMediaQuery(
    "only screen and (min-width: 300px) and (max-width: 750px)"
  );

  const handleLanguageChange = (selectedOption) => {
    i18n.changeLanguage(selectedOption.value);
    localStorage.setItem("i18nextLng", selectedOption.value);
  };

  return (
    <div className="lang-menu">
      <Select
        options={options}
        defaultValue={savedLang === "en" ? options[0] : options[1]}
        onChange={handleLanguageChange}
        formatOptionLabel={(option) => (
          <div
            className="language-select__option"
            style={{ display: "flex", alignItems: "center" }}
          >
            <img
              src={option.icon}
              alt={option.label}
              className="language-select__img"
            />
            {!isPhoneDisplay && option.label}
          </div>
        )}
        styles={isPhoneDisplay ? customStylesMobile : customStyles}
        className="language-select"
        classNamePrefix="language-select"
        isSearchable={false}
      />
    </div>
  );
};

export default LanguageSelector;
