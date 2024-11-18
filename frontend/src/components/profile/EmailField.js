import React, { useContext } from "react";

import { IoMdAt } from "react-icons/io";

import { useTranslation } from "react-i18next";

import { ProfileContext } from "../../pages/Profile";

import "../../styles/profile/userFields.css";

function EmailField() {
  const { email, setEmail } = useContext(ProfileContext);

  const { t } = useTranslation();

  return (
    <div className="form-group">
      <label htmlFor="email">{t("e-mail")}</label>
      <div className="input-icon">
        <input
          type="email"
          name="logemail"
          className="form-style"
          placeholder={t("e-mail-input")}
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <i className="icon">
          <IoMdAt />
        </i>
      </div>
    </div>
  );
}

export default EmailField;
