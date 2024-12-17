import React from "react";
import { useTranslation } from "react-i18next";

import { ItemDescriptionProps } from "../../../lib/types";

import "../../../styles/home/items/itemDescription.css";

function ItemDescription({ title }: ItemDescriptionProps) {
  const { t } = useTranslation();

  return (
    <>
      <p className="card-title">{t(`${title}-title`)}</p>
      <p className="card-description">{t(`${title}-description`)}</p>
    </>
  );
}

export default ItemDescription;
