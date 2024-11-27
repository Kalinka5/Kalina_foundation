import React from "react";

import { useTranslation } from "react-i18next";

import "../../styles/itemEdit/updateButton.css";

function UpdateButton({ loading }) {
  const { t } = useTranslation();

  return (
    <button type="submit">
      {t("submit")}
      {loading && <div className="loader"></div>}
    </button>
  );
}

export default UpdateButton;
