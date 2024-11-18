import React from "react";

import { useTranslation } from "react-i18next";

import "../../styles/payment/monoMethod.css";

export const MonoBank = () => {
  const { t } = useTranslation();

  return (
    <div className="mono-container">
      <figure>
        <div className="container-mastercard">
          <div className="front-card front-hov">
            <div className="column1">
              <h3 id="main-title">
                monobank | <span>Universal Bank</span>
              </h3>
              <div id="chip"></div>
              <div className="card-info">
                <p id="no">5375 4141 2253 7789</p>
                <div className="grid-date">
                  <p id="name">Daniil Kalinevych</p>
                  <p id="exp-date">dd/yy</p>
                </div>
              </div>
            </div>
            <div className="column2">
              <i id="globe" className="fa fa-globe"></i>
              <div id="mastercard"></div>
            </div>
          </div>
        </div>
      </figure>
      <div className="article-body mono-body">
        <p id="monobanka-p">{t("monobanka-p")}</p>
        <a
          href="https://send.monobank.ua/jar/QsATQ1NQ4"
          target="_blank"
          rel="noreferrer"
        >
          {t("monobank")}
        </a>
      </div>
    </div>
  );
};
