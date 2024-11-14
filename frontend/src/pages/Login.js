import React, { createContext, useState } from "react";

import useOrientation from "../useOrientation";

import LoginPortrait from "../components/LoginPortrait";
import LoginLandscape from "../components/LoginLandscape";
import Header from "../components/Header";

import "../styles/login.css";

export const LoginContext = createContext(null);

function Login(props) {
  const orientation = useOrientation();
  const links = props.links;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login header-body">
      <Header links={links} fixed={false} />
      <LoginContext.Provider value={{ email, setEmail, password, setPassword }}>
        <div className="login-register main-body">
          {orientation.isPortrait ? <LoginPortrait /> : <LoginLandscape />}
        </div>
      </LoginContext.Provider>
    </div>
  );
}

export default Login;
