import React from "react";

import useOrientation from "../useOrientation";

import LoginPortrait from "../components/LoginPortrait";
import LoginLandscape from "../components/LoginLandscape";

import "../styles/login.css";

function Login() {
  const orientation = useOrientation();

  return (
    <div className="login">
      <div className="login-register">
        {orientation.isPortrait ? <LoginPortrait /> : <LoginLandscape />}
      </div>
    </div>
  );
}

export default Login;
