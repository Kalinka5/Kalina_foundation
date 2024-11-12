import React, { createContext, useState } from "react";

import { IoIosHelpCircle, IoIosBrowsers, IoIosCheckmark } from "react-icons/io";

import { useTranslation } from "react-i18next";

import PaypalMethod from "./PayPalMethod";

import CryptoPaymentForm from "./CryptoMethod";

import SliderDonatePortrait1 from "./SliderDonatePortrait";

import "../styles/paymentPortrait.css";

export const PaymentPortraitContext = createContext(null);

export const PaymentPortrait = () => {
  const [bankChange, setbankChange] = useState(1);

  const [recCoppied, setRecCoppied] = useState(false);
  const [ibanCoppied, setIbanCoppied] = useState(false);
  const [innCoppied, setInnCoppied] = useState(false);
  const [titleCoppied, setTitleCoppied] = useState(false);

  const recipient = "Каліневич Данііл Олександрович";
  const iban = "UA863052990000026201737711936";
  const inn = "3765604679";
  const title = "Благодійний безповоротний внесок";

  const { t } = useTranslation();

  const clickCopyRec = () => {
    navigator.clipboard.writeText(recipient);
    setRecCoppied(true);
    setInterval(function () {
      setRecCoppied(false);
    }, 5000);
  };
  const clickCopyIban = () => {
    navigator.clipboard.writeText(iban);
    setIbanCoppied(true);
    setInterval(function () {
      setIbanCoppied(false);
    }, 5000);
  };
  const clickCopyInn = () => {
    navigator.clipboard.writeText(inn);
    setInnCoppied(true);
    setInterval(function () {
      setInnCoppied(false);
    }, 5000);
  };
  const clickCopyTitle = () => {
    navigator.clipboard.writeText(title);
    setTitleCoppied(true);
    setInterval(function () {
      setTitleCoppied(false);
    }, 5000);
  };

  return (
    <div className="flex-center">
      <div className="mob-container">
        <PaymentPortraitContext.Provider value={setbankChange}>
          <SliderDonatePortrait1 />
        </PaymentPortraitContext.Provider>
        <div className={`grid-part form-section move-${bankChange}`}>
          <div className="block row1">
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
          </div>
          <div id="mono-desc" className="description">
            <p id="monobanka-p">{t("monobanka-p")}</p>
            <a
              href="https://send.monobank.ua/jar/QsATQ1NQ4"
              target="_blank"
              rel="noreferrer"
            >
              {t("monobank")}
            </a>
          </div>
          <div className="block row1">
            <div className="container-visa">
              <div className="front front-hov">
                <img
                  src="https://i.ibb.co/PYss3yv/map.png"
                  className="map-img"
                  alt="Map"
                />
                <div className="row">
                  <img
                    src="https://i.ibb.co/G9pDnYJ/chip.png"
                    width="60px"
                    alt="Chip"
                  />
                  <img
                    src="https://i.ibb.co/WHZ3nRJ/visa.png"
                    width="60px"
                    alt="Visa"
                  />
                </div>
                <div className="row card-no">
                  <p>4149</p>
                  <p>4390</p>
                  <p>2438</p>
                  <p>4293</p>
                </div>
                <div className="row card-holder">
                  <p>CARD HOLDER</p>
                  <p>VALID TILL</p>
                </div>
                <div className="row name">
                  <p>Daniil Kalinevych</p>
                  <p>dd / yy</p>
                </div>
              </div>
            </div>
          </div>
          <div id="visa-desc" className="description">
            <div className="desc-field">
              <label>{t("recipient")}</label>
              <div className="input-box">
                <input
                  className="number"
                  type="text"
                  defaultValue={recipient}
                  disabled
                  readOnly
                />
                <span className="copy-toggle-icon" onClick={clickCopyRec}>
                  {recCoppied ? (
                    <i className="checkmark">
                      <IoIosCheckmark />
                    </i>
                  ) : (
                    <i className="copy">
                      <IoIosBrowsers />
                    </i>
                  )}
                </span>
              </div>
            </div>
            <div className="desc-field">
              <label>IBAN</label>
              <div className="input-box">
                <input
                  className="number"
                  type="text"
                  defaultValue={iban}
                  disabled
                  readOnly
                />
                <span className="copy-toggle-icon" onClick={clickCopyIban}>
                  {ibanCoppied ? (
                    <i className="checkmark">
                      <IoIosCheckmark />
                    </i>
                  ) : (
                    <i className="copy">
                      <IoIosBrowsers />
                    </i>
                  )}
                </span>
              </div>
            </div>
            <div className="desc-field">
              <label>{t("rnokpp")}</label>
              <div className="input-box">
                <input
                  className="inputname"
                  type="text"
                  defaultValue={inn}
                  disabled
                  readOnly
                />
                <span className="copy-toggle-icon" onClick={clickCopyInn}>
                  {innCoppied ? (
                    <i className="checkmark">
                      <IoIosCheckmark />
                    </i>
                  ) : (
                    <i className="copy">
                      <IoIosBrowsers />
                    </i>
                  )}
                </span>
              </div>
            </div>
            <div className="desc-field">
              <label>{t("title")}</label>
              <div className="input-box">
                <input
                  className="expire"
                  type="text"
                  defaultValue={title}
                  disabled
                  readOnly
                />
                <span className="copy-toggle-icon" onClick={clickCopyTitle}>
                  {titleCoppied ? (
                    <i className="checkmark">
                      <IoIosCheckmark />
                    </i>
                  ) : (
                    <i className="copy">
                      <IoIosBrowsers />
                    </i>
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="grid-paypal">
            <PaypalMethod />
          </div>
          <div className="grid-metamask">
            <CryptoPaymentForm />
          </div>
        </div>
        <div className="mob-tooltip">
          <IoIosHelpCircle className="question-icon" />
          {t("q1-head")}
          <span className="tooltiptext">
            {" "}
            {t("q1-text1")}
            <br />
            <br />
            {t("q1-text2")}
            <br />
            <br />
            {t("q1-text3")}
            <b>
              <i>username</i>
            </b>{" "}
            {t("q1-text4")}
          </span>
        </div>
      </div>
    </div>
  );
};
