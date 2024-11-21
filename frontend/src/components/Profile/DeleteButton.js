import React, { useContext } from "react";

import { useTranslation } from "react-i18next";

import { ProfileContext } from "../../pages/Profile.tsx";

import "../../styles/profile/deleteButton.css";

function DeleteButton() {
  const { setIsOpen } = useContext(ProfileContext);

  const { t } = useTranslation();

  return (
    <button
      className="btn btn-delete"
      type="button"
      id="delete-user"
      onClick={() => setIsOpen(true)}
    >
      {t("delete-button")}
    </button>
  );
}

export default DeleteButton;
