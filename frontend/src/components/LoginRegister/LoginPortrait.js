import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../lib/api.js";
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  PROFILE_PAGE,
} from "../../lib/constants.js";

import InputField from "./LoginField.tsx";
import LogRegHeader from "./Header.tsx";
import LogRegLink from "./Link.tsx";
import SubmitButton from "./SubmitButton.tsx";

import { REGISTER_PAGE } from "../../lib/constants.js";

import { LoginContext } from "../../pages/Login.tsx";

function LoginPortrait() {
  const { email, setEmail, password, setPassword } = useContext(LoginContext);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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
    <div className="portrait">
      <div className="log-reg-background">
        <div className="shape shape1"></div>
        <div className="shape shape2"></div>
      </div>
      <form className="log-reg-form form-p" onSubmit={handleSubmit}>
        <LogRegHeader text="login-head" />

        <InputField
          label="email"
          value={email}
          placeholder="your-email"
          type="email"
          onChange={setEmail}
        />

        <InputField
          label="password"
          value={password}
          placeholder="your-password"
          type="password"
          onChange={setPassword}
        />

        <SubmitButton text="login-button" loading={loading} />

        <LogRegLink
          link={REGISTER_PAGE}
          textLink="register-now"
          question="login-q"
        />
      </form>
    </div>
  );
}

export default LoginPortrait;
