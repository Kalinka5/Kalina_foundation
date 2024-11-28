import React from "react";

import { useTranslation } from "react-i18next";

import { LogRegTitleProps } from "../../lib/types";

function Title({ text }: LogRegTitleProps) {
  const { t } = useTranslation();

  return <h2>{t(text)}</h2>;
}

export default Title;
