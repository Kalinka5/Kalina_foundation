import React, { useContext } from "react";

import { LoginContext } from "../../pages/Login";

function EmailField(props) {
  const { email, setEmail } = useContext(LoginContext);
  const { t } = props.translate;

  return (
    <div className="email-field">
      <label className="email-label" htmlFor="email">
        {t("email")}
      </label>
      <div className="log-input-box">
        <input
          type="text"
          value={email}
          placeholder="Your Email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
    </div>
  );
}

export default EmailField;
