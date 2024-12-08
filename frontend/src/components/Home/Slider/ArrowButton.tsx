import React from "react";

import { ArrowButtonProps } from "../../../lib/types";

import "../../../styles/home/slider/arrowButton.css";

function ArrowButton({ className, onClick, children }: ArrowButtonProps) {
  return (
    <div className={`slider-button ${className}`}>
      <button className={className} onClick={onClick}>
        {children}
      </button>
    </div>
  );
}

export default ArrowButton;
