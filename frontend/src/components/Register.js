import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../css/register.css";
import api from "../api";
import Validation from "../validation";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [validFields, setValidFields] = useState({});

  const navigate = useNavigate();

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
        navigate("/profile");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-register">
      <div className="log-reg-background">
        <div className="register-shape"></div>
        <div className="register-shape"></div>
      </div>
      <form className="log-reg-form" onSubmit={handleSubmit}>
        <h2>Registration</h2>

        <div className="reg-input-box">
          <input
            className={`${validFields.usernameIsValid ? "success" : "error"}`}
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>

        <div className="reg-input-box">
          <input
            className={`${validFields.emailIsValid ? "success" : "error"}`}
            type="text"
            placeholder="user123@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div className="reg-input-box">
          <input
            className={`${validFields.passwordIsValid ? "success" : "error"}`}
            type="password"
            placeholder="Create password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>

        <div className="reg-input-box">
          <input
            className={`${
              validFields.confPasswordIsValid ? "success" : "error"
            }`}
            type="password"
            placeholder="Confirm password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>

        <div className="reg-input-box button">
          <button type="submit">
            Register Now
            {loading && <div className="loader"></div>}
          </button>
        </div>

        <div className="text">
          <h3 className="reg-h3">
            Already have an account? <a href="/login">Login now</a>
          </h3>
        </div>
      </form>
    </div>
  );
}

export default Register;
