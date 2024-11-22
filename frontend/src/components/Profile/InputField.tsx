import React from "react";

import { useTranslation } from "react-i18next";

import { ProfileInputFieldProps } from "../../lib/types";

import "../../styles/profile/userFields.css";

function InputField({
  value,
  onChange,
  label,
  tLabel,
  type,
  placeholder,
  icon,
}: ProfileInputFieldProps) {
  const { t } = useTranslation();

  return (
    <div className="form-group">
      <label htmlFor={label}>{t(tLabel)}</label>
      <div className="input-icon">
        <input
          type={type}
          name={label}
          className="form-style"
          placeholder={t(placeholder)}
          id={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <i className="icon">{icon}</i>
      </div>
    </div>
  );
}

export default InputField;
