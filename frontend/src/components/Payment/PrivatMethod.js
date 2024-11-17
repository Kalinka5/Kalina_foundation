import React, { useContext, useState } from "react";

import { IoIosBrowsers, IoIosCheckmark } from "react-icons/io";

import { useTranslation } from "react-i18next";

import { PaymentLandscapeContext } from "./PaymentLandscape";

import "../../styles/privatMethod.css";

export const PrivatBank = () => {
  const { currentDonation } = useContext(PaymentLandscapeContext);

  const { t } = useTranslation();

  const [recCoppied, setRecCoppied] = useState(false);
  const [ibanCoppied, setIbanCoppied] = useState(false);
  const [innCoppied, setInnCoppied] = useState(false);
  const [titleCoppied, setTitleCoppied] = useState(false);

  const recipient = "Каліневич Данііл Олександрович";
  const iban = "UA863052990000026201737711936";
  const inn = "3765604679";
  const title = "Благодійний безповоротний внесок";

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
    <div className="privat-container">
      <figure>
        <div className="container-visa">
          <div
            className={`front front-hov ${
              currentDonation === 1 ? "img-z-1" : ""
            }`}
          >
            <img
              src="https://i.ibb.co/PYss3yv/map.png"
              className="map-img"
              alt="Map"
            />
            <div className="row p-r-15 p-l-15 p-t-15">
              <img
                src="https://i.ibb.co/G9pDnYJ/chip.png"
                width="50px"
                alt="Chip"
                className="chip-img"
              />
              <img
                src="https://i.ibb.co/WHZ3nRJ/visa.png"
                width="50px"
                alt="Visa"
                className="visa-img"
              />
            </div>
            <div className="row card-no p-r-15 p-l-15">
              <p>4149</p>
              <p>4390</p>
              <p>2438</p>
              <p>4293</p>
            </div>
            <div className="row card-holder p-r-15 p-l-15">
              <p>CARD HOLDER</p>
              <p>VALID TILL</p>
            </div>
            <div className="row name p-r-15 p-l-15 p-b-15">
              <p>Daniil Kalinevych</p>
              <p>dd / yy</p>
            </div>
          </div>
        </div>
      </figure>
      <div id="visa-desc" className="article-body">
        <div>
          <label htmlFor="recipient">{t("recipient")}</label>
          <div className="input-box">
            <input
              className="number"
              type="text"
              defaultValue={recipient}
              disabled
              readOnly
              id="recipient"
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
        <div>
          <label htmlFor="iban">IBAN</label>
          <div className="input-box">
            <input
              className="number"
              type="text"
              defaultValue={iban}
              disabled
              readOnly
              id="iban"
              autoComplete="off"
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
        <div>
          <label htmlFor="rnokpp">{t("rnokpp")}</label>
          <div className="input-box">
            <input
              className="inputname"
              type="text"
              defaultValue={inn}
              disabled
              readOnly
              id="rnokpp"
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
        <div>
          <label htmlFor="title">{t("title")}</label>
          <div className="input-box">
            <input
              className="expire"
              type="text"
              defaultValue={title}
              disabled
              readOnly
              id="title"
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
    </div>
  );
};
