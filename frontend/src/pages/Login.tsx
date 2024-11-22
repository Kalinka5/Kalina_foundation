import React, { createContext, useState } from "react";

import useOrientation from "../lib/useOrientation.js";

import LoginPortrait from "../components/LoginRegister/LoginPortrait.js";
import LoginLandscape from "../components/LoginRegister/LoginLandscape.js";
import Header from "../components/Header.tsx";

import { LoginContextType } from "../lib/types.tsx";

import "../styles/loginRegister/login.css";

export const LoginContext = createContext<LoginContextType | undefined>(
  undefined
);

function Login() {
  const orientation = useOrientation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login header-body">
      <Header />
      <LoginContext.Provider value={{ email, setEmail, password, setPassword }}>
        <div className="login-register main-body">
          {orientation.isPortrait ? <LoginPortrait /> : <LoginLandscape />}
        </div>
      </LoginContext.Provider>
    </div>
  );
}

export default Login;
