import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";

import reportWebVitals from "./reportWebVitals";

import AuthProvider from "./components/AuthContext.tsx";

import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

import "./styles/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
