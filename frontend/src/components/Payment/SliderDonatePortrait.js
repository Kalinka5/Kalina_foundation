import React from "react";

import metaMaskIcon from "../../img/metamask-icon.svg";
import paypalIcon from "../../img/paypal-icon.svg";
import privatIcon from "../../img/privat-icon.svg";
import monoIcon from "../../img/mono-icon.jpeg";

import "../../styles/payment/sliderDonatePortrait.css";

const SliderDonatePortrait = ({ setPayMethod }) => {
  return (
    <div className="portrait-donate-slider">
      <button onClick={() => setPayMethod(1)}>
        <img src={monoIcon} alt="Mono Bank" />
      </button>
      <button onClick={() => setPayMethod(2)}>
        <img src={privatIcon} alt="Privat Bank" />
      </button>
      <button onClick={() => setPayMethod(3)}>
        <img src={paypalIcon} alt="PayPal" />
      </button>
      <button onClick={() => setPayMethod(4)}>
        <img src={metaMaskIcon} alt="MetaMask" />
      </button>
    </div>
  );
};

export default SliderDonatePortrait;
