import React, { useState } from "react";
import "../css/register.css";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password1);

    try {
      await api.post("/register", formData);
      navigate("/profile");
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="register-background">
        <div className="register-shape"></div>
        <div className="register-shape"></div>
      </div>
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Registration</h2>

        <div className="input-box">
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-box">
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-box">
          <input
            type="password"
            placeholder="Create password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            required
          />
        </div>

        <div className="input-box">
          <input
            type="password"
            placeholder="Confirm password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </div>

        <div className="input-box button">
          <button type="submit">
            Register Now
            {loading && <div className="loader"></div>}
          </button>
        </div>

        <div className="text">
          <h3>
            Already have an account? <a href="/login">Login now</a>
          </h3>
        </div>
      </form>
    </div>
  );
}

export default Register;
