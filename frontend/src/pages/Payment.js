import React from "react";

import { PaymentPortrait } from "../components/PaymentPortrait";
import { PaymentLandscape } from "../components/PaymentLandscape";
import Header from "../components/Header";

import useOrientation from "../useOrientation";

import "../styles/payment.css";

function Payment(props) {
  const orientation = useOrientation();
  const links = props.links;

  return (
    <div className="payment">
      <Header links={links} fixed={false} />
      {orientation.isPortrait ? <PaymentPortrait /> : <PaymentLandscape />}
    </div>
  );
}

export default Payment;
