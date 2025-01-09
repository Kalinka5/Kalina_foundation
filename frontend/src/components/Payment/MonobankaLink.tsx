import React from "react";

import "../../styles/payment/monobankaLink.css";

const MonobankaLink = ({ children }) => {
  return (
    <a
      href="https://send.monobank.ua/jar/QsATQ1NQ4"
      className="monobanka-link"
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
};

export default MonobankaLink;
