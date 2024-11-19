import React, { useContext } from "react";

import { IoIosBulb } from "react-icons/io";

import { RegisterContext } from "../../pages/Register.tsx";

function Password2(props) {
  const { password2, setPassword2 } = useContext(RegisterContext);
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
              : validFields.confPasswordIsValid
              ? "success"
              : "error"
          }`}
          type="password"
          placeholder={t("conf-pass-input")}
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        <i className="--icon">
          <IoIosBulb />
          <span className="tooltiptext confirm-tip">{t("tooltip4")}</span>
        </i>
      </div>
      {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
    </div>
  );
}

export default Password2;
