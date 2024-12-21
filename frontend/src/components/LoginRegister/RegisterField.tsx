import React from "react";

import { IoIosBulb } from "react-icons/io";

import { useTranslation } from "react-i18next";

import { RegisterFieldProps } from "../../lib/types";

import "../../styles/loginRegister/fieldError.css";

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
    <>
      <div className="input-box">
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
        <div className="icon bulb">
          <IoIosBulb />
          <span className={`tooltiptext ${className}`}>{t(tooltipText)}</span>
        </div>
      </div>
      <p className={`field-error ${errors[errorsName] && "visible"}`}>
        {errors[errorsName]}
      </p>
    </>
  );
}

export default InputField;
