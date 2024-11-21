import React, { useContext } from "react";

import { FaAutoprefixer } from "react-icons/fa6";

import { useTranslation } from "react-i18next";

import { ProfileContext } from "../../pages/Profile.tsx";

import "../../styles/profile/userFields.css";

function FirstnameField() {
  const { first_name, setFirstName } = useContext(ProfileContext);

  const { t } = useTranslation();

  return (
    <div className="form-group">
      <label htmlFor="firstname">{t("firstname")}</label>
      <div className="input-icon">
        <input
          type="text"
          name="firstname"
          className="form-style"
          placeholder={t("firstname-input")}
          id="firstname"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <i className="icon">
          <FaAutoprefixer />
        </i>
      </div>
    </div>
  );
}

export default FirstnameField;
