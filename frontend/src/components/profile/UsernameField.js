import React, { useContext } from "react";

import { IoIosContact } from "react-icons/io";

import { useTranslation } from "react-i18next";

import { ProfileContext } from "../../pages/Profile";

import "../../styles/profile/usernameField.css";

function UsernameField() {
  const { username, setUsername } = useContext(ProfileContext);

  const { t } = useTranslation();

  return (
    <div className="input-data">
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <div className="underline"></div>
      <label htmlFor="username">{t("username")}</label>
      <i className="icon">
        <IoIosContact />
      </i>
    </div>
  );
}

export default UsernameField;
