import React from "react";

import { PaymentPortrait } from "../components/paymentPortrait";
import { PaymentLandscape } from "../components/paymentLandscape";

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
