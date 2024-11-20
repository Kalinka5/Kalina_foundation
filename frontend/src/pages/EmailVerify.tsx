import React, { useEffect, useState, useContext } from "react";

import { useParams } from "react-router-dom";

import { useTranslation } from "react-i18next";

import api from "../lib/api.js";

import Header from "../components/Header.tsx";

import { AuthContext } from "../App.tsx";

import "../styles/emailVerify.css";

function EmailVerify() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthContext.Provider");
  }

  const { auth, authLinks, notAuthLinks } = authContext;
  const links = auth ? authLinks : notAuthLinks;

  const { uid } = useParams();
  const { token } = useParams();

  const [emailStatus, setEmailStatus] = useState<"success" | "failed" | null>(
    null
  );

  const { t } = useTranslation();

  useEffect(() => {
    verifyEmail();
  }, []);

  const verifyEmail = async () => {
    try {
      if (token) {
        const res = await api.get(`/activate/${uid}/${token}/`);
        if (res.data.status === "success") {
          setEmailStatus("success");
        } else if (res.data.status === "failed") {
          setEmailStatus("failed");
        }
      }
    } catch (err) {
      alert(err);
      console.log(
        "Something go wrong when sending request to activate the user"
      );
    }
  };

  let statusMessage: React.ReactNode = null;
  if (emailStatus === "success") {
    statusMessage = (
      <div className="text success">
        <h1 className="title">
          {t("email")} <strong>{t("verification")}</strong>
          <em>{t("done")}</em>
        </h1>
      </div>
    );
  } else if (emailStatus === "failed") {
    statusMessage = (
      <div className="text failed">
        <h1 className="title">
          {t("email")} <strong>{t("verification")}</strong>
          <em>{t("failed")}</em>
        </h1>
        <p>{t("failed-sent")}</p>
      </div>
    );
  } else {
    statusMessage = (
      <div className="loading-container">
        <div className="loading-text">
          <span className="letter1">L</span>
          <span className="letter2">O</span>
          <span className="letter3">A</span>
          <span className="letter4">D</span>
          <span className="letter5">I</span>
          <span className="letter6">N</span>
          <span className="letter7">G</span>
        </div>
      </div>
    );
  }

  return (
    <div className="email-verify header-body">
      <Header links={links} />
      <div className="main-body">
        <div className="ternary-system">
          <div className="sun primary"></div>
          <div className="sun secondary"></div>
          <div className="sun ternary"></div>
        </div>
        <div className="sand">
          <div className="pendulums">
            <div className="pendulum">
              <div className="bar"></div>
              <div className="motion">
                <div className="string"></div>
                <div className="weight"></div>
              </div>
            </div>
            <div className="pendulum shadow">
              <div className="bar"></div>
              <div className="motion">
                <div className="string"></div>
                <div className="weight"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="pyramid"></div>
        {statusMessage}
      </div>
    </div>
  );
}

export default EmailVerify;
