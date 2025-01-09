import React from "react";

import { PaymentPortrait } from "../components/Payment/PaymentPortrait.js";
import { PaymentLandscape } from "../components/Payment/PaymentLandscape.js";
import Header from "../components/Header.tsx";

import useOrientation from "../lib/useOrientation.js";

import "../styles/payment/payment.css";

function Payment() {
  const orientation = useOrientation();

  return (
    <div className="payment header-body">
      <Header />
      <div
        className={`main-body ${
          orientation.isLandscape && "payment-landscape"
        }`}
      >
        {orientation.isPortrait ? <PaymentPortrait /> : <PaymentLandscape />}
      </div>
    </div>
  );
}

export default Payment;
