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

export const PaymentLandscape = () => {
  const [currentDonation, setCurrentDonation] = useState(1);

  return (
    <div className="container payment-container">
      <div className="pc-version">
        <PaymentLandscapeContext.Provider
          value={{ currentDonation, setCurrentDonation }}
        >
          <Question1 />
          <ButtonHeader />
          <Question2 />

          <article
            className={`payment-methods blue ${
              currentDonation === 2 && "others"
            }`}
          >
            <div className={`front ${currentDonation === 1 && "index-100"}`}>
              <MonoBank />
            </div>
            <div className={`back ${currentDonation === 2 && "index-100"}`}>
              <CryptoPaymentsForm />
            </div>
          </article>
          <article>
            <DonateInfo />
          </article>
          <article
            className={`payment-methods yellow ${
              currentDonation === 2 && "others"
            }`}
          >
            <div className={`front ${currentDonation === 1 && "index-100"}`}>
              <PrivatBank />
            </div>
            <div className={`back ${currentDonation === 2 && "index-100"}`}>
              <PaypalMethod />
            </div>
          </article>

          <div className="change-method-container">
            <ChangeDonateMethod />
          </div>
        </PaymentLandscapeContext.Provider>
      </div>
    </div>
  );
};
