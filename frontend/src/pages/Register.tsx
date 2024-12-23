import React, { useState } from "react";
import Alert from "@mui/material/Alert";

import { useTranslation } from "react-i18next";

import { LOGIN_PAGE } from "../lib/constants.js";

import api from "../lib/api.js";
import Validation from "../lib/validation.js";

import LogRegContainer from "../components/LoginRegister/LogRegContainer.tsx";
import LogRegForm from "../components/LoginRegister/LogRegForm.tsx";
import Header from "../components/Header.tsx";
import Title from "../components/LoginRegister/Title.tsx";
import InputField from "../components/LoginRegister/RegisterField.tsx";
import LogRegLink from "../components/LoginRegister/Link.tsx";
import SubmitButton from "../components/LoginRegister/SubmitButton.tsx";

import { RegistrationStatus } from "../lib/types.tsx";

import "../styles/loginRegister/alertMessage.css";

function Register() {
  const [registrationStatus, setRegistrationStatus] =
    useState<RegistrationStatus>(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [validFields, setValidFields] = useState({});

  const { t } = useTranslation();

  let statusMessage: React.ReactNode = null;
  if (registrationStatus === "success") {
    statusMessage = (
      <Alert
        variant="filled"
        severity="success"
        className="alert-message"
        onClose={() => {
          setRegistrationStatus(null);
        }}
      >
        <b>Registration successful!</b> Please check your <b>email</b> to verify
        your account.
      </Alert>
    );
  }

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
    <div className="header-body">
      <Header />

      <LogRegContainer message={statusMessage}>
        <LogRegForm handleSubmit={handleSubmit}>
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
        </LogRegForm>
      </LogRegContainer>
    </div>
  );
}

export default Register;
