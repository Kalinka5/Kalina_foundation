import React, { useContext, useState } from "react";

import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import { LoginContext } from "../../pages/Login";

function PasswordField(props) {
  const { password, setPassword } = useContext(LoginContext);
  const [passVisible, setPassVisible] = useState(false);
  const [passType, setPassType] = useState("password");
  const { t } = props.translate;

  const clickIcon = () => {
    if (passVisible) {
      setPassType("password");
      setPassVisible(false);
    } else {
      setPassType("text");
      setPassVisible(true);
    }
  };

  return (
    <div className="password-field">
      <label htmlFor="password">{t("password")}</label>
      <div className="log-input-box">
        <input
          type={passType}
          value={password}
          placeholder={t("your-password")}
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="password-toggle-icon" onClick={clickIcon}>
          {passVisible ? (
            <i>
              <IoMdEyeOff />
            </i>
          ) : (
            <i>
              <IoMdEye />
            </i>
          )}
        </span>
      </div>
    </div>
  );
}

export default PasswordField;
