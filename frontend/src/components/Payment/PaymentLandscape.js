import React, { createContext, useState, useContext } from "react";

import { DonateInfo } from "./DonateInfo";
import { Question1, Question2 } from "./Questions";
import { ButtonHeader } from "./ButtonHeader";
import { MonoBank } from "./MonoMethod";
import { PrivatBank } from "./PrivatMethod";
import PaypalMethod from "./PayPalMethod";
import CryptoPaymentsForm from "./CryptoMethod";
import ChangeDonateMethod from "./SliderDonateLandscape";

import { AuthContext } from "../../App.tsx";

import "../../styles/payment/paymentLandscape.css";

export const PaymentLandscapeContext = createContext([{}]);

export const PaymentLandscape = () => {
  const { auth } = useContext(AuthContext);

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
            className={`payment-methods ${currentDonation === 2 && "others"}`}
          >
            <div className={`front ${currentDonation === 1 && "index-100"}`}>
              <MonoBank />
            </div>
            <div className={`back ${currentDonation === 2 && "index-100"}`}>
              <CryptoPaymentsForm isAuth={auth} />
            </div>
          </article>
          <article>
            <DonateInfo />
          </article>
          <article
            className={`payment-methods ${currentDonation === 2 && "others"}`}
          >
            <div className={`front ${currentDonation === 1 && "index-100"}`}>
              <PrivatBank />
            </div>
            <div className={`back ${currentDonation === 2 && "index-100"}`}>
              <PaypalMethod />
            </div>
          </article>
        </div>

        <ChangeDonateMethod />
      </PaymentLandscapeContext.Provider>
    </div>
  );
};
