import React from "react";
import ReactDOM from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import App from "./App.tsx";

import reportWebVitals from "./reportWebVitals";

import AuthProvider from "./components/AuthContext.tsx";

import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

import "./styles/index.css";

export const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </I18nextProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
