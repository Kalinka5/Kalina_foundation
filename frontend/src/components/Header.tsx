import React from "react";
import { useTranslation } from "react-i18next";

import LanguageSelector from "./LanguageSelector";

import "../styles/header.css";

type Link = {
  id: number;
  urlLink: string;
  urlName: string;
};

type HeaderProps = {
  fixed?: "pos-fixed";
  links: Link[];
};

const Header = ({ fixed, links }: HeaderProps) => {
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
