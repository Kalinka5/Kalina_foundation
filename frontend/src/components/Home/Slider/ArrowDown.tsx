import React from "react";

import "../../../styles/home/slider/arrowDown.css";

function ArrowDown() {
  return (
    <div className="arrow-container animation">
      <div className="moving-arrow">
        <span className="arrow-down"></span>
        <span className="arrow-down"></span>
      </div>
    </div>
  );
}

export default ArrowDown;
