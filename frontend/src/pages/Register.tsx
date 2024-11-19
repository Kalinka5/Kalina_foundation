import React, { createContext, useState, useEffect, useContext } from "react";
import Alert from "@mui/material/Alert";
import useOrientation from "../useOrientation.js";

import RegisterPortrait from "../components/LoginRegister/RegisterPortrait.js";
import RegisterLandscape from "../components/LoginRegister/RegisterLandscape.js";
import Header from "../components/Header.tsx";

import i18n from "../i18n.js";

import { AuthContext } from "../App.tsx";

import "../styles/loginRegister/register.css";

type RegistrationStatus = "success" | "failed" | null;

type RegisterContextType = {
  registrationStatus: RegistrationStatus;
  setRegistrationStatus: React.Dispatch<
    React.SetStateAction<RegistrationStatus>
  >;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password1: string;
  setPassword1: React.Dispatch<React.SetStateAction<string>>;
  password2: string;
  setPassword2: React.Dispatch<React.SetStateAction<string>>;
};

export const RegisterContext = createContext<RegisterContextType | undefined>(
  undefined
);

function Register() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthContext.Provider");
  }

  const { auth, authLinks, notAuthLinks } = authContext;
  const links = auth ? authLinks : notAuthLinks;

  const [registrationStatus, setRegistrationStatus] =
    useState<RegistrationStatus>(null);

  const orientation = useOrientation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  useEffect(() => {
    // Check if language is properly saved in localStorage
    const savedLanguage = localStorage.getItem("i18nextLng") || "ua";
    console.log("Language Loaded from LocalStorage: ", savedLanguage);
    i18n.changeLanguage(savedLanguage); // Ensure correct language on load
  }, []);

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
      <Header links={links} />
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
