import React, { createContext, useState } from "react";
import Alert from "@mui/material/Alert";
import useOrientation from "../lib/useOrientation.js";

import RegisterPortrait from "../components/LoginRegister/RegisterPortrait.js";
import RegisterLandscape from "../components/LoginRegister/RegisterLandscape.js";
import Header from "../components/Header.tsx";

import { RegisterContextType, RegistrationStatus } from "../lib/types.tsx";

import "../styles/loginRegister/register.css";

export const RegisterContext = createContext<RegisterContextType | undefined>(
  undefined
);

function Register() {
  const [registrationStatus, setRegistrationStatus] =
    useState<RegistrationStatus>(null);

  const orientation = useOrientation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

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

  return (
    <div className="register header-body">
      <Header />
      <div className="login-register main-body">
        {statusMessage}
        <RegisterContext.Provider
          value={{
            registrationStatus,
            setRegistrationStatus,
            username,
            setUsername,
            email,
            setEmail,
            password1,
            setPassword1,
            password2,
            setPassword2,
          }}
        >
          {orientation.isPortrait ? (
            <RegisterPortrait />
          ) : (
            <RegisterLandscape />
          )}
        </RegisterContext.Provider>
      </div>
    </div>
  );
}

export default Register;
