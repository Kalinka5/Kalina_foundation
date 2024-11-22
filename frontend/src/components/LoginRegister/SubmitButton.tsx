import React from "react";

import { useTranslation } from "react-i18next";

import { SubmitButtonProps } from "../../lib/types";

import "../../styles/loginRegister/submitButton.css";

function SubmitButton({ text, loading }: SubmitButtonProps) {
  const { t } = useTranslation();

  return (
    <button type="submit" className="submit-but">
      {t(text)}
      {loading && <div className="loader"></div>}
    </button>
  );
}

export default SubmitButton;
