import React, { useContext } from "react";

import { PaymentPortrait } from "../components/Payment/PaymentPortrait.js";
import { PaymentLandscape } from "../components/Payment/PaymentLandscape.js";
import Header from "../components/Header.tsx";

import useOrientation from "../useOrientation.js";

import { AuthContext } from "../App.tsx";

import "../styles/payment/payment.css";

function Payment() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthContext.Provider");
  }

  const { auth, authLinks, notAuthLinks } = authContext;
  const links = auth ? authLinks : notAuthLinks;

  const orientation = useOrientation();

  return (
    <div className="payment header-body">
      <Header links={links} />
      <div className="main-body">
        {orientation.isPortrait ? <PaymentPortrait /> : <PaymentLandscape />}
      </div>
    </div>
  );
}

export default Payment;
