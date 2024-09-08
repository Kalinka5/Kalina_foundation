import React from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

import "../styles/header.css";

const Header = (props) => {
  const { t } = useTranslation();

  const handleLanguageChange = (e) => {
    e.preventDefault(); // Prevent default link behavior
    const newLang = e.target.getAttribute("data-lang"); // Get the language code from the data attribute
    i18n.changeLanguage(newLang);
  };

  return (
    <header>
      <div className="logo">
        <a href="/home/1">
          <span>Kalina</span> <span>Foundation</span>
        </a>
      </div>
      <div className="nav">
        <ul>
          {props.links.map((el) => (
            <li key={el.id}>
              <a href={el.urlLink}>{t(el.urlName)}</a>
            </li>
          ))}
          <li>
            <div className="lang-menu">
              <div className="selected-lang">English</div>
              <ul>
                <li>
                  <a
                    href="#"
                    className="ua"
                    onClick={handleLanguageChange}
                    data-lang="ua"
                  >
                    UA
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="en"
                    onClick={handleLanguageChange}
                    data-lang="en"
                  >
                    EN
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
