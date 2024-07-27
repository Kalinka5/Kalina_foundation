import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN, PROFILE_PAGE } from "../constants";

import useOrientation from "../useOrientation";

import loginImg1 from "../img/login-img1.jpg";
import loginImg2 from "../img/login-img2.jpg";
import loginImg3 from "../img/login-img3.jpg";
import loginImg4 from "../img/login-img4.jpg";

import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passVisible, setPassVisible] = useState(false);
  const [passType, setPassType] = useState("password");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const orientation = useOrientation();

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
    <div className="login">
      <div className="login-register">
        {orientation.isPortrait ? (
          <div className="portrait">
            <div className="log-reg-background">
              <div className="shape log-shape1"></div>
              <div className="shape log-shape2"></div>
            </div>
            <form className="log-reg-form log-p" onSubmit={handleSubmit}>
              <h3 className="log-h3">Login Here</h3>

              <label className="email-label" htmlFor="email">
                Email
              </label>
              <div className="log-input-box">
                <input
                  type="text"
                  value={email}
                  placeholder="Your Email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <label htmlFor="password">Password</label>
              <div className="log-input-box">
                <input
                  type={passType}
                  value={password}
                  placeholder="Your Password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
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

              <div className="btn-container log-button">
                <button type="submit">
                  Log In
                  {loading && <div className="loader"></div>}
                </button>
              </div>

              <p className="log-p">
                You don't have an account?
                <br />
                <a href="/register">Register now</a>
              </p>
            </form>
          </div>
        ) : (
          <div className="landscape">
            <div className="image column">
              <img src={loginImg4} alt="Login" />
            </div>
            <form className="log-reg-form log-p column" onSubmit={handleSubmit}>
              <h3 className="log-h3">Login Here</h3>

              <label className="email-label" htmlFor="email">
                Email
              </label>
              <div className="log-input-box">
                <input
                  type="text"
                  value={email}
                  placeholder="Your Email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <label htmlFor="password">Password</label>
              <div className="log-input-box">
                <input
                  type={passType}
                  value={password}
                  placeholder="Your Password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
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

              <div className="btn-container log-button">
                <button type="submit">
                  Log In
                  {loading && <div className="loader"></div>}
                </button>
              </div>

              <p className="log-p">
                You don't have an account?
                <br />
                <a href="/register">Register now</a>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
