import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Alert from "@mui/material/Alert";

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
      <Alert
        variant="filled"
        severity="success"
        className="alert-message"
        onClose={() => {
          setEmailStatus(null);
        }}
      >
        Email Verification Done
      </Alert>
    );
  } else {
    statusMessage = (
      <Alert
        variant="filled"
        severity="error"
        className="alert-message"
        onClose={() => {
          setEmailStatus(null);
        }}
      >
        Email Verification Failed. Email may be already verified or the link is
        broken
      </Alert>
    );
  }

  return <div className="container">{statusMessage}</div>;
}

export default EmailVerify;
