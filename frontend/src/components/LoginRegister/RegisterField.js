import React from "react";

import { IoIosBulb } from "react-icons/io";

function InputField(props) {
  const value = props.value;
  const placeholder = props.placeholder;
  const type = props.type;
  const onChange = props.onChange;
  const validFields = props.validFields;
  const isValid = props.isValid;
  const errors = props.errors;
  const errorsName = props.errorsName;
  const className = props.className;
  const tooltipText = props.tooltipText;
  const { t } = props.translate;

  const isObjectEmpty = (objectName) => {
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
