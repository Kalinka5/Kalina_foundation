import React, { useContext, useState } from "react";

import { useTranslation } from "react-i18next";

import api from "../../lib/api.js";
import Validation from "../../lib/validation.js";

import { LOGIN_PAGE } from "../../lib/constants.js";

import { RegisterContext } from "../../pages/Register.tsx";

import LogRegHeader from "./Header.tsx";
import InputField from "./RegisterField.tsx";
import LogRegLink from "./Link.tsx";
import SubmitButton from "./SubmitButton.tsx";

function RegisterPortrait() {
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
        const requestData = {
          username: username,
          email: email,
          password: password1,
        };

        const response = await api("/register", {
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
    <div className="portrait">
      <div className="log-reg-background">
        <div className="shape shape1"></div>
        <div className="shape shape2"></div>
      </div>
      <form className="log-reg-form form-p" onSubmit={handleSubmit}>
        <LogRegHeader text="registration-head" />

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
        />

        <SubmitButton text="register-now" loading={loading} />

        <LogRegLink
          link={LOGIN_PAGE}
          textLink="login-now"
          question="register-q"
        />
      </form>
    </div>
  );
}

export default RegisterPortrait;
