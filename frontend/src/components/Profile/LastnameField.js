import React, { useContext } from "react";

import { FaAustralSign } from "react-icons/fa6";

import { useTranslation } from "react-i18next";

import { ProfileContext } from "../../pages/Profile.tsx";

import "../../styles/profile/userFields.css";

function LastnameField() {
  const { last_name, setLastName } = useContext(ProfileContext);

  const { t } = useTranslation();

  return (
    <div className="form-group">
      <label htmlFor="lastname">{t("lastname")}</label>
      <div className="input-icon">
        <input
          type="text"
          name="lastname"
          className="form-style"
          placeholder={t("lastname-input")}
          id="lastname"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
        />
        <i className="icon">
          <FaAustralSign />
        </i>
      </div>
    </div>
  );
}

export default LastnameField;
