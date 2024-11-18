import React, { useContext } from "react";

import { useTranslation } from "react-i18next";

import { ProfileContext } from "../../pages/Profile";

import "../../styles/profile/deleteButton.css";

function DeleteButton() {
  const { setIsOpen } = useContext(ProfileContext);

  const { t } = useTranslation();

  return (
    <div className="delete-button">
      <button
        className="btn btn-delete"
        type="button"
        id="submit1"
        onClick={() => setIsOpen(true)}
      >
        {t("delete-button")}
      </button>
    </div>
  );
}

export default DeleteButton;
