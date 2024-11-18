import React, { createContext, useState } from "react";

import { DonateInfo } from "./DonateInfo";
import { Question1, Question2 } from "./Questions";
import { ButtonHeader } from "./ButtonHeader";
import { MonoBank } from "./MonoMethod";
import { PrivatBank } from "./PrivatMethod";
import PaypalMethod from "./PayPalMethod";
import CryptoPaymentsForm from "./CryptoMethod";
import ChangeDonateMethod from "./SliderDonateLandscape";

import "../../styles/payment/paymentLandscape.css";

export const PaymentLandscapeContext = createContext([{}]);

export const PaymentLandscape = (props) => {
  const isAuth = props.isAuth;

  const [currentDonation, setCurrentDonation] = useState(1);

  return (
    <div className="pc-version">
      <PaymentLandscapeContext.Provider
        value={{ currentDonation, setCurrentDonation }}
      >
        <div className="payment-header">
          <Question1 />
          <ButtonHeader />
          <Question2 />
        </div>
        <div className="cards">
          <article
            className={`payment-methods ${
              currentDonation === 2 ? "others" : ""
            }`}
          >
            <div
              className={`article-wrapper front ${
                currentDonation === 1 && "index-100"
              }`}
            >
              <MonoBank />
            </div>
            <div
              className={`article-wrapper back ${
                currentDonation === 2 && "index-100"
              }`}
            >
              <CryptoPaymentsForm isAuth={isAuth} />
            </div>
          </article>
          <article>
            <div className="article-wrapper">
              <DonateInfo />
            </div>
          </article>
          <article
            className={`payment-methods ${
              currentDonation === 2 ? "others" : ""
            }`}
          >
            <div
              className={`article-wrapper front ${
                currentDonation === 1 && "index-100"
              }`}
            >
              <PrivatBank />
            </div>
            <div
              className={`article-wrapper back ${
                currentDonation === 2 && "index-100"
              }`}
            >
              <PaypalMethod />
            </div>
          </article>
        </div>

        <ChangeDonateMethod />
      </PaymentLandscapeContext.Provider>
    </div>
  );
};
