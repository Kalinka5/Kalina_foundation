import React from "react";

import { IoIosCreate, IoIosKeypad } from "react-icons/io";

import "../../styles/itemEdit/input.css";

function Input({ value, onChange, placeholder, withIcon, styleName, type }) {
  const icon =
    placeholder === "Title" ? (
      <IoIosCreate size={30} />
    ) : (
      <IoIosKeypad size={30} />
    );

  return (
    <div className={`input-group ${styleName}`}>
      <input
        className="edit-item-input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {withIcon && (
        <div className="input-icon">
          <i>{icon}</i>
        </div>
      )}
    </div>
  );
}

export default Input;
