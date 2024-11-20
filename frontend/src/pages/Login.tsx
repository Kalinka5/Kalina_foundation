import React, { createContext, useState, useContext } from "react";

import useOrientation from "../lib/useOrientation.js";

import LoginPortrait from "../components/LoginRegister/LoginPortrait.js";
import LoginLandscape from "../components/LoginRegister/LoginLandscape.js";
import Header from "../components/Header.tsx";

import { AuthContext } from "../App.tsx";

import "../styles/loginRegister/login.css";

type LoginContextType = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};

export const LoginContext = createContext<LoginContextType | undefined>(
  undefined
);

function Login() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthContext.Provider");
  }

  const { auth, authLinks, notAuthLinks } = authContext;
  const links = auth ? authLinks : notAuthLinks;

  const orientation = useOrientation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login header-body">
      <Header links={links} />
      <LoginContext.Provider value={{ email, setEmail, password, setPassword }}>
        <div className="login-register main-body">
          {orientation.isPortrait ? <LoginPortrait /> : <LoginLandscape />}
        </div>
      </LoginContext.Provider>
    </div>
  );
}

export default Login;
