import React, { useContext, useState } from "react";

import api from "../../lib/api.js";
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  PROFILE_PAGE,
} from "../../lib/constants.js";

import Title from "./Title.tsx";
import InputField from "./LoginField.tsx";
import LogRegLink from "./Link.tsx";
import SubmitButton from "./SubmitButton.tsx";

import { REGISTER_PAGE } from "../../lib/constants.js";

import { LoginContext } from "../../pages/Login.tsx";

import { TokenResponse, LogRegFormProps } from "../../lib/types.tsx";

import "../../styles/loginRegister/logRegForm.css";

function LoginForm({ className }: LogRegFormProps) {
  const context = useContext(LoginContext);

  if (!context) {
    throw new Error("LoginForm must be used within a LoginContextProvider");
  }

  const { email, setEmail, password, setPassword } = context;

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const response = (await api("token/", {
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
      })) as TokenResponse;

      if (response?.access && response?.refresh) {
        localStorage.setItem(ACCESS_TOKEN, response.access);
        localStorage.setItem(REFRESH_TOKEN, response.refresh);

        window.location.href = PROFILE_PAGE; // Navigate and refresh
      } else {
        alert("Email or Password are not valid!");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={`log-reg-form ${className}`} onSubmit={handleSubmit}>
      <Title text="login-head" />

      <div className="form-fields">
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
      </div>
      <div className="form-fields">
        <SubmitButton text="login-button" loading={loading} />
      </div>
      <div className="form-fields">
        <LogRegLink
          link={REGISTER_PAGE}
          textLink="register-now"
          question="login-q"
        />
      </div>
    </form>
  );
}

export default LoginForm;
