import React from "react";

import { useTranslation } from "react-i18next";

import { useMediaQuery } from "@uidotdev/usehooks";

import image from "../../img/winner.png";

import "../../styles/home/cardImage.css";

function CardImage() {
  const isMonitor = useMediaQuery("only screen and (min-width: 1500px)");

  const { t } = useTranslation();

  return (
    <div className={`card-img ${isMonitor && "mon-wid"}`}>
      <div className="content">
        <div className={`imgBx ${isMonitor && "monitor-img"}`}>
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
