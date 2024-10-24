import React, { useContext } from "react";

import { PaymentContext } from "./PaymentLandscape";

import "../styles/changeDonateMethod.css";

const ChangeDonMethod = () => {
  const { currentDonation, setCurrentDonation } = useContext(PaymentContext);

  const handleOptionClick = (index) => {
    setCurrentDonation(index); // Update the position on click
  };

  return (
    <div className="donate-change">
      <div className="bar">
        <div
          className={`option ${currentDonation === 1 ? "active" : ""}`}
          onClick={() => handleOptionClick(1)}
        >
          Cards
        </div>
        <div
          className={`option ${currentDonation === 2 ? "active" : ""}`}
          onClick={() => handleOptionClick(2)}
        >
          Others
        </div>
      </div>
      <div className={`ellipse pos${currentDonation}`} />
    </div>
  );
};

export default ChangeDonMethod;
