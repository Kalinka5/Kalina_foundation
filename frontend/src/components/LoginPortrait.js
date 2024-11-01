import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import { useTranslation } from "react-i18next";

import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN, PROFILE_PAGE } from "../constants";

function LoginPortrait() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passVisible, setPassVisible] = useState(false);
  const [passType, setPassType] = useState("password");

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

  const clickIcon = () => {
    if (passVisible) {
      setPassType("password");
      setPassVisible(false);
    } else {
      setPassType("text");
      setPassVisible(true);
    }
  };

  return (
    <div className="portrait">
      <div className="log-reg-background">
        <div className="shape shape1"></div>
        <div className="shape shape2"></div>
      </div>
      <form className="log-reg-form form-p" onSubmit={handleSubmit}>
        <h2>{t("login-head")}</h2>

        <label className="email-label" htmlFor="email">
          {t("email")}
        </label>
        <div className="log-input-box">
          <input
            type="text"
            value={email}
            placeholder="Your Email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <label htmlFor="password">{t("password")}</label>
        <div className="log-input-box">
          <input
            type={passType}
            value={password}
            placeholder="Your Password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="password-toggle-icon" onClick={clickIcon}>
            {passVisible ? (
              <i>
                <IoMdEyeOff />
              </i>
            ) : (
              <i>
                <IoMdEye />
              </i>
            )}
          </span>
        </div>

        <div className="btn-container subm-button">
          <button type="submit">
            {t("login-button")}
            {loading && <div className="loader"></div>}
          </button>
        </div>

        <p className="help-p">
          {t("login-q")}
          <br />
          <a href="/register">{t("register-now")}</a>
        </p>
      </form>
    </div>
  );
}

export default LoginPortrait;
