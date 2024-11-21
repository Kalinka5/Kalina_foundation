import React from "react";
import { useTranslation } from "react-i18next";

import "../../styles/home/editItemButton.css";

function EditItemButton({ id }) {
  const { t } = useTranslation();

  return (
    <a
      className="edit-button"
      href={`/item/${id}/edit`}
      target="_blank"
      rel="noreferrer"
    >
      <span>{t("edit-button")}</span>
    </a>
  );
}

export default EditItemButton;
