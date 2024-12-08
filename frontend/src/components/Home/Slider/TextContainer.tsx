import React from "react";

import "../../../styles/home/slider/textContainer.css";

function TextContainer({ className, children }) {
  return (
    <div className={`text-container animation ${className}`}>{children}</div>
  );
}

export default TextContainer;
