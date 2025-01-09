import React from "react";

import { useTranslation } from "react-i18next";

import CreditCard from "./CreditCard.tsx";
import MonoTitle from "./CreditCard/MonoTitle.tsx";
import GlobeIcon from "./CreditCard/GlobeIcon.tsx";
import MonoNumber from "./CreditCard/MonoNumber.tsx";
import CardHolder from "./CreditCard/CardHolder.tsx";
import MasterCardIcon from "./CreditCard/MasterCardIcon.tsx";
import MonoText from "./MonoText.tsx";
import MonobankaLink from "./MonobankaLink.tsx";

import "../../styles/payment/monoMethod.css";

export const MonoBank = () => {
  const { t } = useTranslation();

  return (
    <>
      <CreditCard className="card mono">
        <div className="row">
          <MonoTitle />
          <GlobeIcon />
        </div>
        <div className="row info">
          <div className="card-info">
            <MonoNumber />
            <CardHolder />
          </div>
          <MasterCardIcon />
        </div>
      </CreditCard>
      <div className="article-body mono-body">
        <MonoText>{t("monobanka-p")}</MonoText>
        <MonobankaLink>{t("monobank")}</MonobankaLink>
      </div>
    </>
  );
};
