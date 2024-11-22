import React from "react";

import { IoIosBulb } from "react-icons/io";

import { useTranslation } from "react-i18next";

import { RegisterFieldProps } from "../../lib/types";

function InputField({
  value,
  placeholder,
  type,
  onChange,
  validFields,
  isValid,
  errors,
  errorsName,
  className,
  tooltipText,
}: RegisterFieldProps) {
  const { t } = useTranslation();

  const isObjectEmpty = (objectName: Record<string, boolean>): boolean => {
    return Object.keys(objectName).length === 0;
  };

  return (
    <div className="reg-input-box">
      <div className="input-icon">
        <input
          className={`${
            isObjectEmpty(validFields)
              ? ""
              : validFields[isValid]
              ? "success"
              : "error"
          }`}
          type={type}
          placeholder={t(placeholder)}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <i className="--icon">
          <IoIosBulb />
          <span className={`tooltiptext ${className}`}>{t(tooltipText)}</span>
        </i>
      </div>
      {errors[errorsName] && <p>{errors[errorsName]}</p>}
    </div>
  );
}

export default InputField;
