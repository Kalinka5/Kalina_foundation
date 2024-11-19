import React, { useContext } from "react";

import { IoIosBulb } from "react-icons/io";

import { RegisterContext } from "../../pages/Register.tsx";

function Password1(props) {
  const { password1, setPassword1 } = useContext(RegisterContext);
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
              : validFields.passwordIsValid
              ? "success"
              : "error"
          }`}
          type="password"
          placeholder={t("password-input")}
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
        />
        <i className="--icon">
          <IoIosBulb />
          <span className="tooltiptext pass-tip">{t("tooltip3")}</span>
        </i>
      </div>
      {errors.password && <p>{errors.password}</p>}
    </div>
  );
}

export default Password1;
