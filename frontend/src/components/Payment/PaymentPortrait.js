import React, { createContext, useState } from "react";

import { IoIosHelpCircle } from "react-icons/io";

import { useTranslation } from "react-i18next";

import { MonoBank } from "./MonoMethod";
import { PrivatBank } from "./PrivatMethod";
import PaypalMethod from "./PayPalMethod";
import CryptoPaymentForm from "./CryptoMethod";

import SliderDonatePortrait1 from "./SliderDonatePortrait";

import "../../styles/paymentPortrait.css";

export const PaymentPortraitContext = createContext(null);

export const PaymentPortrait = () => {
  const [bankChange, setbankChange] = useState(1);

  const { t } = useTranslation();

  return (
    <div className="flex-center">
      <div className="mob-container">
        <PaymentPortraitContext.Provider value={setbankChange}>
          <SliderDonatePortrait1 />
        </PaymentPortraitContext.Provider>
        <div className={`grid-part form-section move-${bankChange}`}>
          <div className="grid-mono grid-column">
            <MonoBank />
          </div>
          <div className="grid-privat grid-column">
            <PrivatBank />
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
