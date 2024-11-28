import React from "react";

import { IoIosContact } from "react-icons/io";

import { useTranslation } from "react-i18next";

import { UsernameFieldProps } from "../../lib/types";

import "../../styles/profile/usernameField.css";

function UsernameField({ username, setUsername }: UsernameFieldProps) {
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
