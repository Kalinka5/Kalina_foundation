import React, { useState, useContext } from "react";

import { useTranslation } from "react-i18next";

import api from "../../api";
import Validation from "../../validation";

import { LOGIN_PAGE } from "../../constants";

import Carousel from "./Carousel";

import { RegisterContext } from "../../pages/Register.tsx";

import SubmitButton from "./SubmitButton";
import LogRegHeader from "./Header";
import InputField from "./RegisterField.js";
import LogRegLink from "./Link";

function RegisterLandscape() {
  const {
    username,
    setUsername,
    email,
    setEmail,
    password1,
    setPassword1,
    password2,
    setPassword2,
  } = useContext(RegisterContext);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [validFields, setValidFields] = useState({});

  const { setRegistrationStatus } = useContext(RegisterContext);

  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const [err, valFields] = Validation(
      username,
      email,
      password1,
      password2,
      t
    );
    setErrors(err);
    setValidFields(valFields);

    try {
      if (Object.keys(err).length === 0) {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password1);

        await api.post("/register", formData);
        setRegistrationStatus("success");
      }
    } catch (error) {
      setRegistrationStatus("error");
      if (error.response.data["email"]) {
        setErrors({ email: error.response.data["email"] });
      } else if (error.response.data["username"]) {
        setErrors({ username: error.response.data["username"] });
      } else {
        alert(error);
      }
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
        <form className="log-reg-form reg-p" onSubmit={handleSubmit}>
          <LogRegHeader text="registration-head" translate={{ t }} />

          <InputField
            value={username}
            placeholder="username-input"
            type="text"
            onChange={setUsername}
            validFields={validFields}
            isValid="usernameIsValid"
            errors={errors}
            errorsName={"username"}
            className="name-tip"
            tooltipText="tooltip1"
            translate={{ t }}
          />

          <InputField
            value={email}
            placeholder="email-input"
            type="text"
            onChange={setEmail}
            validFields={validFields}
            isValid="emailIsValid"
            errors={errors}
            errorsName={"email"}
            className="email-tip"
            tooltipText="tooltip2"
            translate={{ t }}
          />

          <InputField
            value={password1}
            placeholder="password-input"
            type="password"
            onChange={setPassword1}
            validFields={validFields}
            isValid="passwordIsValid"
            errors={errors}
            errorsName={"password"}
            className="pass-tip"
            tooltipText="tooltip3"
            translate={{ t }}
          />

          <InputField
            value={password2}
            placeholder="conf-pass-input"
            type="password"
            onChange={setPassword2}
            validFields={validFields}
            isValid="confPasswordIsValid"
            errors={errors}
            errorsName={"confirmPassword"}
            className="confirm-tip"
            tooltipText="tooltip4"
            translate={{ t }}
          />

          <SubmitButton
            text="register-now"
            loading={loading}
            translate={{ t }}
          />

          <LogRegLink
            link={LOGIN_PAGE}
            textLink="login-now"
            question="register-q"
            translate={{ t }}
          />
        </form>
      </div>
    </div>
  );
}

export default RegisterLandscape;
