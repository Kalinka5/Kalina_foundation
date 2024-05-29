import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { IoIosBulb } from "react-icons/io";

import api from "../api";
import Validation from "../validation";

import { LOGIN_PAGE } from "../constants";

import "../styles/register.css";

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
        navigate(`${LOGIN_PAGE}`);
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="login-register">
        <div className="log-reg-background">
          <div className="shape reg-shape1"></div>
          <div className="shape reg-shape2"></div>
        </div>
        <form className="log-reg-form reg-p" onSubmit={handleSubmit}>
          <h2>Registration</h2>

          <div className="reg-input-box">
            <div className="input-icon">
              <input
                className={`${
                  validFields.usernameIsValid ? "success" : "error"
                }`}
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <i className="--icon">
                <IoIosBulb />
              </i>
              <span className="tooltiptext name-tip">
                Username не повинен бути пустим!
              </span>
            </div>
            {errors.username && <p>{errors.username}</p>}
          </div>

          <div className="reg-input-box">
            <div className="input-icon">
              <input
                className={`${validFields.emailIsValid ? "success" : "error"}`}
                type="text"
                placeholder="user123@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <i className="--icon">
                <IoIosBulb />
              </i>
              <span className="tooltiptext email-tip">
                Правильний формат адреси електронної пошти складається з 4
                частин: локальна частина, символ "@", крапка і доменне ім'я.
              </span>
            </div>
            {errors.email && <p>{errors.email}</p>}
          </div>

          <div className="reg-input-box">
            <div className="input-icon">
              <input
                className={`${
                  validFields.passwordIsValid ? "success" : "error"
                }`}
                type="password"
                placeholder="Create password"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
              />
              <i className="--icon">
                <IoIosBulb />
              </i>
              <span className="tooltiptext pass-tip">
                Ваш пароль повинен складатися не менше ніж з 8 символів і
                містити не менше 1 літери, 1 цифри та 1 спеціального символу
                (наприклад, #, @, &)
              </span>
            </div>
            {errors.password && <p>{errors.password}</p>}
          </div>

          <div className="reg-input-box">
            <div className="input-icon">
              <input
                className={`${
                  validFields.confPasswordIsValid ? "success" : "error"
                }`}
                type="password"
                placeholder="Confirm password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
              <i className="--icon">
                <IoIosBulb />
              </i>
              <span className="tooltiptext confirm-tip">
                Підтверджувальний пароль повинен співпадати зі створюваним
                паролем!
              </span>
            </div>
            {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
          </div>

          <div className="btn-container reg-button">
            <button type="submit">
              Register Now
              {loading && <div className="loader"></div>}
            </button>
          </div>

          <p>
            Already have an account?
            <br />
            <a href={`${LOGIN_PAGE}`}>Login now</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
