import React from "react";

import { useTranslation } from "react-i18next";

import image from "../../../img/winner.png";

import "../../../styles/home/donators/cardImage.css";

function CardImage() {
  const { t } = useTranslation();

  return (
    <div className={`card-img`}>
      <div className="content">
        <div className="imgBx">
          <img src={image} alt="Winner" />
        </div>
        <div className="contentBx">
          <h3>
            {t("donators-h")}
            <br />
            <span>{t("donators-p")}</span>
          </h3>
        </div>
      </div>
      <ul className="sci">
        <li>
          <a href="/donate">Monobank</a>
        </li>
        <li>
          <a href="/donate">Privat24</a>
        </li>
      </ul>
    </div>
  );
}

export default CardImage;
