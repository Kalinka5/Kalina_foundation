import React from "react";
import { useTranslation } from "react-i18next";

import "../../../styles/home/items/donateButton.css";

function DonateButton() {
  const { t } = useTranslation();

  return (
    <a href="/donate" className="donate-but" target="_blank">
      {t("donate-button")}
    </a>
  );
}

export default DonateButton;
