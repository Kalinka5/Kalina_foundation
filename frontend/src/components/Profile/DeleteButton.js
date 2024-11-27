import React from "react";

import { useTranslation } from "react-i18next";

import "../../styles/profile/deleteButton.css";

function DeleteButton({ onClick, className }) {
  const { t } = useTranslation();

  return (
    <button
      className={`btn btn-delete ${className}`}
      type="button"
      id="delete-user"
      onClick={onClick}
    >
      {t("delete-button")}
    </button>
  );
}

export default DeleteButton;
