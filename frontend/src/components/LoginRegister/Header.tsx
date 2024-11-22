import React from "react";

import { useTranslation } from "react-i18next";

import { LogRegHeaderProps } from "../../lib/types";

function LogRegHeader({ text }: LogRegHeaderProps) {
  const { t } = useTranslation();

  return <h2>{t(text)}</h2>;
}

export default LogRegHeader;
