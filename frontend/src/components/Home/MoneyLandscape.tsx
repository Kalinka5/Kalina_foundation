import React from "react";

import { useTranslation } from "react-i18next";

import { MoneyProps } from "../../lib/types";

import "../../styles/home/moneyLandscape.css";

function MoneyLandscape({ donated }: MoneyProps) {
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
