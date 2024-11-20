import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

import api from "../../lib/api.js";
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  PROFILE_PAGE,
} from "../../lib/constants.js";

import Carousel from "./Carousel";

import InputField from "./LoginField.js";
import SubmitButton from "./SubmitButton";
import LogRegHeader from "./Header";
import LogRegLink from "./Link";

import { REGISTER_PAGE } from "../../lib/constants.js";

import { LoginContext } from "../../pages/Login.tsx";

function LoginLandscape() {
  const { email, setEmail, password, setPassword } = useContext(LoginContext);

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

          <InputField
            label="email"
            value={email}
            placeholder="your-email"
            type="email"
            onChange={setEmail}
            translate={{ t }}
          />

          <InputField
            label="password"
            value={password}
            placeholder="your-password"
            type="password"
            onChange={setPassword}
            translate={{ t }}
          />

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
