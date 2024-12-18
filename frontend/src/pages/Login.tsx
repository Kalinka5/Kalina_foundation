import React, { createContext, useState } from "react";

import useOrientation from "../lib/useOrientation.js";

import Carousel from "../components/LoginRegister/Carousel.js";
import ShapeBackground from "../components/LoginRegister/ShapeBackground.js";
import LoginForm from "../components/LoginRegister/LoginForm.tsx";
import Header from "../components/Header.tsx";

import { LoginContextType } from "../lib/types.tsx";

export const LoginContext = createContext<LoginContextType | undefined>(
  undefined
);

function Login() {
  const orientation = useOrientation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="header-body">
      <Header />
      <LoginContext.Provider value={{ email, setEmail, password, setPassword }}>
        <div className="login-register main-body">
          {orientation.isPortrait ? (
            <div className="portrait">
              <ShapeBackground />
              <LoginForm className="form-p" />
            </div>
          ) : (
            <div className="landscape">
              <div className="column">
                <Carousel />
              </div>
              <div className="column">
                <LoginForm />
              </div>
            </div>
          )}
        </div>
      </LoginContext.Provider>
    </div>
  );
}

export default Login;
