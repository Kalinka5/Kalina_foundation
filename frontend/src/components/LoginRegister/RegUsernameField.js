import React, { useContext } from "react";

import { IoIosBulb } from "react-icons/io";

import { RegisterContext } from "../../pages/Register";

function UsernameField(props) {
  const { username, setUsername } = useContext(RegisterContext);
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
              : validFields.usernameIsValid
              ? "success"
              : "error"
          }`}
          type="text"
          placeholder={t("username-input")}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <i className="--icon">
          <IoIosBulb />
          <span className="tooltiptext name-tip">{t("tooltip1")}</span>
        </i>
      </div>
      {errors.username && <p>{errors.username}</p>}
    </div>
  );
}

export default UsernameField;
