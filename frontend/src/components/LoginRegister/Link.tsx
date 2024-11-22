import React from "react";

import { useTranslation } from "react-i18next";

import { LogRegLinkProps } from "../../lib/types";

function LogRegLink({ link, textLink, question }: LogRegLinkProps) {
  const { t } = useTranslation();

  return (
    <p className="help-p">
      {t(question)}
      <br />
      <a href={link}>{t(textLink)}</a>
    </p>
  );
}

export default LogRegLink;
