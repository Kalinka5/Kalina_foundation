import React from "react";

import { useTranslation } from "react-i18next";

import { MoneyProps } from "../../lib/types";

import "../../styles/home/moneyPortrait.css";

function MoneyPortrait({ donated }: MoneyProps) {
  const { t } = useTranslation();

  return (
    <div className="money-value">
      ({donated} {t("uah")})
    </div>
  );
}

export default MoneyPortrait;
