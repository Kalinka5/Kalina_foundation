import React from "react";

import { TextPartProps } from "../../../lib/types";

import "../../../styles/home/slider/sliderText.css";

function TextPart({
  className,
  header,
  text,
  classMobile,
  children,
}: TextPartProps) {
  return (
    <div className={`about-container ${className}`}>
      <h2 className={`text-title ${classMobile}`}>{header}</h2>
      <p className={`text list ${classMobile}`}>{text}</p>
      {children}
    </div>
  );
}

export default TextPart;
