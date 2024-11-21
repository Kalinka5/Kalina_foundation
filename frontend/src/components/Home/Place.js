import React from "react";

import { Fa1, Fa2, Fa3, Fa4, Fa5 } from "react-icons/fa6";

import "../../styles/home/place.css";

function Place({ index }) {
  const places = {
    0: <Fa1 />,
    1: <Fa2 />,
    2: <Fa3 />,
    3: <Fa4 />,
    4: <Fa5 />,
  };

  return (
    <div className="place">
      <i className={`icon color${index + 1}`}>{places[index]}</i>
    </div>
  );
}

export default Place;
