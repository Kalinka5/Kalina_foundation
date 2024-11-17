import React, { useState, useContext } from "react";

import { useTranslation } from "react-i18next";

import api from "../../api";
import Validation from "../../validation";

import { LOGIN_PAGE } from "../../constants";

import Carousel from "./Carousel";

import { RegisterContext } from "../../pages/Register";

import SubmitButton from "./SubmitButton";
import LogRegHeader from "./Header";
import UsernameField from "./RegUsernameField";
import EmailField from "./RegEmailField";
import Password1 from "./RegPassword1";
import Password2 from "./RegPassword2";
import LogRegLink from "./Link";

function RegisterLandscape() {
  const { username } = useContext(RegisterContext);
  const { email } = useContext(RegisterContext);
  const { password1 } = useContext(RegisterContext);
  const { password2 } = useContext(RegisterContext);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [validFields, setValidFields] = useState({});

  const { setRegistrationStatus } = useContext(RegisterContext);

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

  return (
    <div className="landscape">
      <div className="image column">
        <Carousel />
      </div>
      <div className="column">
        <form className="log-reg-form reg-p" onSubmit={handleSubmit}>
          <LogRegHeader text="registration-head" translate={{ t }} />

          <UsernameField
            validFields={validFields}
            translate={{ t }}
            errors={errors}
          />

          <EmailField
            validFields={validFields}
            translate={{ t }}
            errors={errors}
          />

          <Password1
            validFields={validFields}
            translate={{ t }}
            errors={errors}
          />

          <Password2
            validFields={validFields}
            translate={{ t }}
            errors={errors}
          />

          <SubmitButton
            text="register-now"
            loading={loading}
            translate={{ t }}
          />

          <LogRegLink
            link={LOGIN_PAGE}
            textLink="login-now"
            question="register-q"
            translate={{ t }}
          />
        </form>
      </div>
    </div>
  );
}

export default RegisterLandscape;
