import React from "react";

import { PaymentPortrait } from "../components/PaymentPortrait";
import { PaymentLandscape } from "../components/PaymentLandscape";

import useOrientation from "../useOrientation";

import "../styles/payment.css";

function Payment() {
  const orientation = useOrientation();

  return (
    <div className="payment">
      {orientation.isPortrait ? <PaymentPortrait /> : <PaymentLandscape />}
    </div>
  );
}

export default Payment;
