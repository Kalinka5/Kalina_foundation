import React from "react";

import { PaymentPortrait } from "../components/Payment/PaymentPortrait";
import { PaymentLandscape } from "../components/Payment/PaymentLandscape";
import Header from "../components/Header";

import useOrientation from "../useOrientation";

import "../styles/payment.css";

function Payment(props) {
  const orientation = useOrientation();
  const links = props.links;
  const isAuth = props.isAuth;

  return (
    <div className="payment header-body">
      <Header links={links} fixed={false} />
      <div className="main-body">
        {orientation.isPortrait ? (
          <PaymentPortrait isAuth={isAuth} />
        ) : (
          <PaymentLandscape isAuth={isAuth} />
        )}
      </div>
    </div>
  );
}

export default Payment;
