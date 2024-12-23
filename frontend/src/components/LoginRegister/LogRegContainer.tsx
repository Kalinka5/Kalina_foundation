import React from "react";

import useOrientation from "../../lib/useOrientation";

import Carousel from "./Carousel.js";
import ShapeBackground from "./ShapeBackground.js";

import { LogRegContainerProps } from "../../lib/types.js";

import "../../styles/loginRegister/logRegContainer.css";

function LogRegContainer({ message, children }: LogRegContainerProps) {
  const orientation = useOrientation();

  return (
    <div className="login-register main-body">
      {message && message}

      {orientation.isPortrait ? (
        <div className="portrait">
          <ShapeBackground />
          {children}
        </div>
      ) : (
        <div className="landscape">
          <div className="column">
            <Carousel />
          </div>
          <div className="column">{children}</div>
        </div>
      )}
    </div>
  );
}

export default LogRegContainer;
