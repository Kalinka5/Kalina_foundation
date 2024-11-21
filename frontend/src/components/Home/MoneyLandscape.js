import React from "react";

import { useTranslation } from "react-i18next";

import "../../styles/home/moneyLandscape.css";

function MoneyLandscape({ donated }) {
  const { t } = useTranslation();

  return (
    <>
      <div className="donated">
        <p>
          {t("donated")} {donated} {t("uah")}
        </p>
      </div>
      <div className="underline"></div>
    </>
  );
}

export default MoneyLandscape;
