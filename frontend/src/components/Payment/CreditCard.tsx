import React from "react";

import { CreditCardProps } from "../../lib/types";

import "../../styles/payment/creditCard.css";

const CreditCard = ({
  className,
  currentDonation,
  children,
}: CreditCardProps) => {
  return (
    <figure className="credit-card">
      <div
        className={`card-front ${className} ${
          currentDonation === 1 && "img-z-1"
        }`}
      >
        {children}
      </div>
    </figure>
  );
};

export default CreditCard;
