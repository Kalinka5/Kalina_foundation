import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

import api from "../../api";
import { ACCESS_TOKEN, REFRESH_TOKEN, PROFILE_PAGE } from "../../constants";

import Carousel from "./Carousel";

import EmailField from "./LogEmailField";
import PasswordField from "./LogPasswordField";
import SubmitButton from "./SubmitButton";
import LogRegHeader from "./Header";
import LogRegLink from "./Link";

import { REGISTER_PAGE } from "../../constants";

import { LoginContext } from "../../pages/Login";

function LoginLandscape() {
  const { email } = useContext(LoginContext);
  const { password } = useContext(LoginContext);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post("/token/", { email, password });
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      navigate(`${PROFILE_PAGE}`);
      navigate(0); // Refresh page
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landscape">
      <div className="column">
        <Carousel />
      </div>
      <div className="column">
        <form className="log-reg-form log-p" onSubmit={handleSubmit}>
          <LogRegHeader text="login-head" translate={{ t }} />

          <EmailField translate={{ t }} />

          <PasswordField translate={{ t }} />

          <SubmitButton
            text="login-button"
            loading={loading}
            translate={{ t }}
          />

          <LogRegLink
            link={REGISTER_PAGE}
            textLink="register-now"
            question="login-q"
            translate={{ t }}
          />
        </form>
      </div>
    </div>
  );
}

export default LoginLandscape;
