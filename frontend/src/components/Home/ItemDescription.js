import React from "react";
import { useTranslation } from "react-i18next";

import "../../styles/home/itemDescription.css";

function ItemDescription({ title }) {
  const { t } = useTranslation();

  return (
    <>
      <p className="card-title">{t(`${title}-title`)}</p>
      <p className="card-description">{t(`${title}-description`)}</p>
    </>
  );
}

export default ItemDescription;
