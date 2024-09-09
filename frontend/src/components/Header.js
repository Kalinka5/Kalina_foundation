import React from "react";
import { useTranslation } from "react-i18next";

import LanguageSelector from "./LanguageSelector";

import "../styles/header.css";

const Header = (props) => {
  const { t } = useTranslation();

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
            <LanguageSelector />
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
