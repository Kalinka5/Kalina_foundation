import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import api from "../api";

import "../styles/emailVerify.css";

function EmailVerify() {
  const { uid } = useParams();
  const { token } = useParams();

  const [emailStatus, setEmailStatus] = useState(null);

  useEffect(() => {
    verifyEmail();
  }, []);

  const verifyEmail = async () => {
    try {
      if (token) {
        const res = await api.get(`/activate/${uid}/${token}/`);
        console.log(res);
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

  let statusMessage = null;
  if (emailStatus === "success") {
    statusMessage = (
      <div className="text success">
        <h1 className="title">
          Email <strong>Verification</strong>
          <em>Done</em>
        </h1>
      </div>
    );
  } else if (emailStatus === "failed") {
    statusMessage = (
      <div className="text failed">
        <h1 className="title">
          Email <strong>Verification</strong>
          <em>Failed</em>
        </h1>
        <p>Email may be already verified or the link is broken</p>
      </div>
    );
  } else {
    statusMessage = (
      <div class="loading-container">
        <div class="loading-text">
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
    <div className="container">
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
  );
}

export default EmailVerify;
