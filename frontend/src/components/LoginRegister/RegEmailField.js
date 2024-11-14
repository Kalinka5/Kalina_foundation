import React, { useContext } from "react";

import { IoIosBulb } from "react-icons/io";

import { RegisterContext } from "../../pages/Register";

function EmailField(props) {
  const { email, setEmail } = useContext(RegisterContext);
  const { t } = props.translate;
  const validFields = props.validFields;
  const errors = props.errors;

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
              : validFields.emailIsValid
              ? "success"
              : "error"
          }`}
          type="text"
          placeholder="user123@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <i className="--icon">
          <IoIosBulb />
          <span className="tooltiptext email-tip">{t("tooltip2")}</span>
        </i>
      </div>
      {errors.email && <p>{errors.email}</p>}
    </div>
  );
}

export default EmailField;
