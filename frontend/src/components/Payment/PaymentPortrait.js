import React, { createContext, useState } from "react";

import { QuestionPortrait } from "./Questions";
import { MonoBank } from "./MonoMethod";
import { PrivatBank } from "./PrivatMethod";
import PaypalMethod from "./PayPalMethod";
import CryptoPaymentForm from "./CryptoMethod";

import SliderDonatePortrait from "./SliderDonatePortrait";

import "../../styles/payment/paymentPortrait.css";

export const PaymentPortraitContext = createContext(null);

export const PaymentPortrait = () => {
  const [payMethod, setPayMethod] = useState(1);

  return (
    <div className="flex-center">
      <div className="mob-container">
        <SliderDonatePortrait setPayMethod={setPayMethod} />
        <div className={`grid-part form-section move-${payMethod}`}>
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
        <QuestionPortrait />
      </div>
    </div>
  );
};
