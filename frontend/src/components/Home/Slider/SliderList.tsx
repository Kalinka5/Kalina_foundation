import React from "react";

import { SliderListProps } from "../../../lib/types";

import "../../../styles/home/slider/sliderList.css";

function SliderList({ classContainer, classList, children }: SliderListProps) {
  return (
    <div className={`container-list ${classContainer}`}>
      <ul className={`list-items ${classList}`}>
        {children.map((el, index) => (
          <li key={index + 1}>{el}</li>
        ))}
      </ul>
    </div>
  );
}

export default SliderList;
