import React from "react";
import { useTranslation } from "react-i18next";

import LanguageSelector from "./LanguageSelector";

import "../styles/header.css";

const Header = (props) => {
  const { t } = useTranslation();
  const fixed = props.fixed;

  return (
    <header className={`${fixed && "pos-fixed"}`}>
      <div className="nav">
        <ul>
          <li>
            <div className="logo">
              <a href="/home/1">
                <span>Kalina</span> <span>Foundation</span>
              </a>
            </div>
          </li>
          <li>
            <LanguageSelector />
          </li>
          <li className="nav-link">
            {props.links.map((el) => (
              <a key={el.id} href={el.urlLink}>
                {t(el.urlName)}
              </a>
            ))}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
