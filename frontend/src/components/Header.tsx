import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

import { useAuth } from "../components/AuthContext.tsx";

import LanguageSelector from "./LanguageSelector";

import { HeaderContext } from "../App.tsx";

import { HeaderProps } from "../lib/types.tsx";

import "../styles/header.css";

const Header = ({ fixed }: HeaderProps) => {
  const authContext = useContext(HeaderContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthContext.Provider");
  }

  const { authLinks, notAuthLinks } = authContext;
  const { isAuthorized } = useAuth();
  const links = isAuthorized ? authLinks : notAuthLinks;
  const { t } = useTranslation();

  return (
    <header className={fixed}>
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
          {links.map((el) => (
            <a key={el.id} href={el.urlLink}>
              {t(el.urlName)}
            </a>
          ))}
        </li>
      </ul>
    </header>
  );
};

export default Header;
