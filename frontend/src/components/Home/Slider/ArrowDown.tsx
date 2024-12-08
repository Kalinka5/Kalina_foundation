import React from "react";

import "../../../styles/home/slider/arrowDown.css";

function ArrowDown() {
  return (
    <div className="arrow-container animation">
      <div className="moving-arrow">
        <a href="#items-section">
          <span className="arrow-down"></span>
          <span className="arrow-down"></span>
        </a>
      </div>
    </div>
  );
}

export default ArrowDown;
