import React, { useState } from "react";

import api from "../lib/api.js";
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  PROFILE_PAGE,
  REGISTER_PAGE,
} from "../lib/constants.js";

import LogRegContainer from "../components/LoginRegister/LogRegContainer.tsx";
import LogRegForm from "../components/LoginRegister/LogRegForm.tsx";
import Header from "../components/Header.tsx";
import Title from "../components/LoginRegister/Title.tsx";
import InputField from "../components/LoginRegister/LoginField.tsx";
import LogRegLink from "../components/LoginRegister/Link.tsx";
import SubmitButton from "../components/LoginRegister/SubmitButton.tsx";

import { TokenResponse } from "../lib/types.tsx";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <div className="header-body">
      <Header />
      <LogRegContainer>
        <LogRegForm handleSubmit={handleSubmit}>
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
        </LogRegForm>
      </LogRegContainer>
    </div>
  );
}

export default Login;
