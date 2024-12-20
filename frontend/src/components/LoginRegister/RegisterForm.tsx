import React, { useState, useContext } from "react";

import { useTranslation } from "react-i18next";

import api from "../../lib/api.js";
import Validation from "../../lib/validation.js";

import { LOGIN_PAGE } from "../../lib/constants.js";

import { RegisterContext } from "../../pages/Register.tsx";

import Title from "./Title.tsx";
import InputField from "./RegisterField.tsx";
import LogRegLink from "./Link.tsx";
import SubmitButton from "./SubmitButton.tsx";

import { LogRegFormProps } from "../../lib/types.tsx";

function RegisterForm({ className }: LogRegFormProps) {
  const context = useContext(RegisterContext);

  if (!context) {
    throw new Error(
      "RegisterForm must be used within a RegisterContextProvider"
    );
  }

  const {
    username,
    setUsername,
    email,
    setEmail,
    password1,
    setPassword1,
    password2,
    setPassword2,
    setRegistrationStatus,
  } = context;

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [validFields, setValidFields] = useState({});

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
        const requestData = {
          username: username,
          email: email,
          password: password1,
        };

        const response = await api("register", {
          method: "POST",
          body: JSON.stringify(requestData),
        });

        // Handle HTTP errors
        if (response.ok) {
          setRegistrationStatus("success");
        } else {
          setRegistrationStatus("error");
          console.log(response);

          // Parse error message if response contains JSON
          try {
            if (response["username"]) {
              setErrors({ username: t("username-already-exists") });
            } else if (response["email"]) {
              setErrors({ email: t("email-already-exists") });
            }
          } catch {
            // Handle non-JSON errors
            console.error("Unexpected error:", response);
            alert(response);
          }
        }
      }
    } catch (error) {
      setRegistrationStatus("error");
      console.error("Unexpected error:", error);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={`log-reg-form ${className}`} onSubmit={handleSubmit}>
      <Title text="registration-head" />

      <div className="form-fields">
        <InputField
          value={username}
          placeholder="username-input"
          type="text"
          onChange={setUsername}
          validFields={validFields}
          isValid="usernameIsValid"
          errors={errors}
          errorsName="username"
          className="name-tip"
          tooltipText="tooltip1"
        />

        <InputField
          value={email}
          placeholder="email-input"
          type="email"
          onChange={setEmail}
          validFields={validFields}
          isValid="emailIsValid"
          errors={errors}
          errorsName="email"
          className="email-tip"
          tooltipText="tooltip2"
        />

        <InputField
          value={password1}
          placeholder="password-input"
          type="password"
          onChange={setPassword1}
          validFields={validFields}
          isValid="passwordIsValid"
          errors={errors}
          errorsName="password"
          className="pass-tip"
          tooltipText="tooltip3"
        />

        <InputField
          value={password2}
          placeholder="conf-pass-input"
          type="password"
          onChange={setPassword2}
          validFields={validFields}
          isValid="confPasswordIsValid"
          errors={errors}
          errorsName="confirmPassword"
          className="confirm-tip"
          tooltipText="tooltip4"
        />
      </div>
      <div className="form-fields">
        <SubmitButton text="register-now" loading={loading} />
      </div>
      <div className="form-fields">
        <LogRegLink
          link={LOGIN_PAGE}
          textLink="login-now"
          question="register-q"
        />
      </div>
    </form>
  );
}

export default RegisterForm;
