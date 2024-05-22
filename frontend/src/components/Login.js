import React, { useState } from "react";
import "../css/login.css";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post("/token/", { email, password });
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      navigate("/1");
      navigate(0); // Refresh page
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-register">
      <div className="log-reg-background">
        <div className="login-shape"></div>
        <div className="login-shape"></div>
      </div>
      <form className="log-reg-form" onSubmit={handleSubmit}>
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
            type="password"
            value={password}
            placeholder="Your Password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="btn-container">
          <button type="submit">
            Log In
            {loading && <div className="loader"></div>}
          </button>
        </div>

        <p>
          You don't have an account?
          <br />
          <a href="/register">Register now</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
