import React, { useState } from "react";

import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import { useTranslation } from "react-i18next";

import { LoginFieldProps } from "../../lib/types";

function InputField({
  label,
  value,
  placeholder,
  type,
  onChange,
}: LoginFieldProps) {
  const [passVisible, setPassVisible] = useState(false);

  // Adjust type dynamically for password visibility toggle
  const inputType = type === "password" && passVisible ? "text" : type;

  const { t } = useTranslation();

  const togglePasswordVisibility = () => {
    setPassVisible(!passVisible);
  };

  return (
    <>
      <label htmlFor={type}>{t(label)}</label>
      <div className="input-box">
        <input
          type={inputType}
          value={value}
          placeholder={t(placeholder)}
          id={type}
          onChange={(e) => onChange(e.target.value)}
        />
        {type === "password" && (
          <span className="icon" onClick={togglePasswordVisibility}>
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
