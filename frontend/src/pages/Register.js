import React, { createContext, useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import useOrientation from "../useOrientation";
import RegisterPortrait from "../components/RegisterPortrait";
import RegisterLandscape from "../components/RegisterLandscape";
import i18n from "../i18n"; // Ensure this is imported

import "../styles/register.css";

export const PatientContext = createContext([{}]);

function Register() {
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const orientation = useOrientation();

  useEffect(() => {
    // Check if language is properly saved in localStorage
    const savedLanguage = localStorage.getItem("i18nextLng") || "ua";
    console.log("Language Loaded from LocalStorage: ", savedLanguage);
    i18n.changeLanguage(savedLanguage); // Ensure correct language on load
  }, []);

  let statusMessage = null;
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
    <div className="register">
      <div className="login-register">
        {statusMessage}
        <PatientContext.Provider
          value={{ registrationStatus, setRegistrationStatus }}
        >
          {orientation.isPortrait ? (
            <RegisterPortrait />
          ) : (
            <RegisterLandscape />
          )}
        </PatientContext.Provider>
      </div>
    </div>
  );
}

export default Register;
