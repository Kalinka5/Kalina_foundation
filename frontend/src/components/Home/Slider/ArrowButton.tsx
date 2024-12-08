import React from "react";

import { ArrowButtonProps } from "../../../lib/types";

import "../../../styles/home/slider/arrowButton.css";

function ArrowButton({ className, onClick, children }: ArrowButtonProps) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default ArrowButton;
