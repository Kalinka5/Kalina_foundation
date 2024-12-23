import React from "react";

import { useTranslation } from "react-i18next";

import { UpdateButtonProps } from "../../lib/types";

import "../../styles/profile/updateButton.css";

function UpdateButton({ loading }: UpdateButtonProps) {
  const { t } = useTranslation();

  return (
    <button type="submit" id="update-user">
      {t("submit")}
      {loading && <div className="loader"></div>}
    </button>
  );
}

export default UpdateButton;
