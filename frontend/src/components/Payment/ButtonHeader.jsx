import React from "react";

import { useTranslation } from "react-i18next";

import "../../styles/payment/buttonHeader.css";

export const ButtonHeader = () => {
  const { t } = useTranslation();

  return (
    <button disabled className="button-arounder">
      {t("donate-page")}
    </button>
  );
};
