import React, { useContext, useState } from "react";

import { IoIosBulb } from "react-icons/io";

import { useTranslation } from "react-i18next";

import api from "../api";
import Validation from "../validation";

import { LOGIN_PAGE } from "../constants";

import { PatientContext } from "../pages/Register";

function RegisterPortrait() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [validFields, setValidFields] = useState({});

  const { setRegistrationStatus } = useContext(PatientContext);

  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const [err, valFields] = Validation(username, email, password1, password2);
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

  const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0;
  };

  return (
    <div className="portrait">
      <div className="log-reg-background">
        <div className="shape reg-shape1"></div>
        <div className="shape reg-shape2"></div>
      </div>
      <form className="log-reg-form reg-p" onSubmit={handleSubmit}>
        <h2>{t("registration")}</h2>

        <div className="reg-input-box">
          <div className="input-icon">
            <input
              className={`${
                isObjectEmpty(validFields)
                  ? ""
                  : validFields.usernameIsValid
                  ? "success"
                  : "error"
              }`}
              type="text"
              placeholder={t("username-input")}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <i className="--icon">
              <IoIosBulb />
            </i>
            <span className="tooltiptext name-tip">{t("tooltip1")}</span>
          </div>
          {errors.username && <p>{errors.username}</p>}
        </div>

        <div className="reg-input-box">
          <div className="input-icon">
            <input
              className={`${
                isObjectEmpty(validFields)
                  ? ""
                  : validFields.emailIsValid
                  ? "success"
                  : "error"
              }`}
              type="text"
              placeholder="user123@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <i className="--icon">
              <IoIosBulb />
            </i>
            <span className="tooltiptext email-tip">{t("tooltip2")}</span>
          </div>
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div className="reg-input-box">
          <div className="input-icon">
            <input
              className={`${
                isObjectEmpty(validFields)
                  ? ""
                  : validFields.passwordIsValid
                  ? "success"
                  : "error"
              }`}
              type="password"
              placeholder={t("password-input")}
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
            />
            <i className="--icon">
              <IoIosBulb />
            </i>
            <span className="tooltiptext pass-tip">{t("tooltip3")}</span>
          </div>
          {errors.password && <p>{errors.password}</p>}
        </div>

        <div className="reg-input-box">
          <div className="input-icon">
            <input
              className={`${
                isObjectEmpty(validFields)
                  ? ""
                  : validFields.confPasswordIsValid
                  ? "success"
                  : "error"
              }`}
              type="password"
              placeholder={t("conf-pass-input")}
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
            <i className="--icon">
              <IoIosBulb />
            </i>
            <span className="tooltiptext confirm-tip">{t("tooltip4")}</span>
          </div>
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>

        <div className="btn-container reg-button">
          <button type="submit">
            {t("register-now")}
            {loading && <div className="loader"></div>}
          </button>
        </div>

        <p>
          {t("register-q")}
          <br />
          <a href={`${LOGIN_PAGE}`}>{t("login-button")}</a>
        </p>
      </form>
    </div>
  );
}

export default RegisterPortrait;
