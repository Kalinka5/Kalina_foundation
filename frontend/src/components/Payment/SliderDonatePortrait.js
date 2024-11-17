import React, { useContext } from "react";

import { PaymentPortraitContext } from "./PaymentPortrait";

import metaMaskIcon from "../../img/metamask-icon.svg";
import paypalIcon from "../../img/paypal-icon.svg";
import privatIcon from "../../img/privat-icon.svg";
import monoIcon from "../../img/mono-icon.jpeg";

import "../../styles/sliderDonatePortrait.css";

const SliderDonatePortrait1 = () => {
  const setBankChange = useContext(PaymentPortraitContext);

  const changeToMono = () => setBankChange(1);
  const changeToPrivat = () => setBankChange(2);
  const changeToPayPal = () => setBankChange(3);
  const changeToMetaMask = () => setBankChange(4);

  return (
    <div className="portrait-donate-slider">
      <button onClick={changeToMono}>
        <img src={monoIcon} alt="Mono Bank" />
      </button>
      <button onClick={changeToPrivat}>
        <img src={privatIcon} alt="Privat Bank" />
      </button>
      <button onClick={changeToPayPal}>
        <img src={paypalIcon} alt="PayPal" />
      </button>
      <button onClick={changeToMetaMask}>
        <img src={metaMaskIcon} alt="MetaMask" />
      </button>
    </div>
  );
};

export default SliderDonatePortrait1;
