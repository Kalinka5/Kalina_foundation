import React, { useState } from "react";

import { IoIosBrowsers, IoIosCheckmark } from "react-icons/io";

import { useTranslation } from "react-i18next";

import CreditCard from "./CreditCard.tsx";
import BackgroundImg from "./CreditCard/BackgroundImg.tsx";
import ChipImg from "./CreditCard/ChipImg.tsx";
import VisaImg from "./CreditCard/VisaImg.tsx";
import PrivatNumber from "./CreditCard/PrivatNumber.tsx";
import NameInfo from "./CreditCard/MonoNameInfo.tsx";
import MonoInfo from "./CreditCard/MonoInfo.tsx";

import "../../styles/payment/privatMethod.css";

export const PrivatBank = () => {
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
    <>
      <CreditCard className="card privat">
        <BackgroundImg />
        <div className="row">
          <ChipImg />
          <VisaImg />
        </div>
        <PrivatNumber />
        <div>
          <NameInfo />
          <MonoInfo />
        </div>
      </CreditCard>
      <div id="visa-desc" className="article-body">
        <div className="input-row">
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
        <div className="input-row">
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
        <div className="input-row">
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
        <div className="input-row">
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
    </>
  );
};
