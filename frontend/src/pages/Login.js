import React from "react";

import useOrientation from "../useOrientation";

import LoginPortrait from "../components/LoginPortrait";
import LoginLandscape from "../components/LoginLandscape";
import Header from "../components/Header";

import "../styles/login.css";

function Login(props) {
  const orientation = useOrientation();
  const links = props.links;

  return (
    <div className="login header-body">
      <Header links={links} fixed={false} />
      <div className="login-register main-body">
        {orientation.isPortrait ? <LoginPortrait /> : <LoginLandscape />}
      </div>
    </div>
  );
}

export default Login;
