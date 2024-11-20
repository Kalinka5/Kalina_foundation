import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

function InputField({ label, value, placeholder, type, onChange, translate }) {
  const [passVisible, setPassVisible] = useState(false);

  // Adjust type dynamically for password visibility toggle
  const inputType = type === "password" && passVisible ? "text" : type;

  const { t } = translate;

  const togglePasswordVisibility = () => {
    setPassVisible(!passVisible);
  };

  return (
    <>
      <label htmlFor={type}>{t(label)}</label>
      <div className="log-input-box">
        <input
          type={inputType}
          value={value}
          placeholder={t(placeholder)}
          id={type}
          onChange={(e) => onChange(e.target.value)}
        />
        {type === "password" && (
          <span
            className="password-toggle-icon"
            onClick={togglePasswordVisibility}
          >
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
        )}
      </div>
    </>
  );
}

export default InputField;
