import React, { useContext } from "react";

import { LoginContext } from "../../pages/Login";

function EmailField(props) {
  const { email, setEmail } = useContext(LoginContext);
  const { t } = props.translate;

  return (
    <>
      <label className="email-label" htmlFor="email">
        {t("email")}
      </label>
      <div className="log-input-box">
        <input
          type="text"
          value={email}
          placeholder={t("your-email")}
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
    </>
  );
}

export default EmailField;
