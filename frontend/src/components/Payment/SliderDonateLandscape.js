import React, { useContext } from "react";

import { useTranslation } from "react-i18next";

import { PaymentLandscapeContext } from "./PaymentLandscape";

import "../../styles/payment/changeDonateMethod.css";

const ChangeDonateMethod = () => {
  const { currentDonation, setCurrentDonation } = useContext(
    PaymentLandscapeContext
  );

  const { t } = useTranslation();

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
          {t("cards")}
        </div>
        <div
          className={`option ${currentDonation === 2 ? "active" : ""}`}
          onClick={() => handleOptionClick(2)}
        >
          {t("others")}
        </div>
      </div>
      <div className={`ellipse pos${currentDonation}`} />
    </div>
  );
};

export default ChangeDonateMethod;
