import React from "react";

function Button(props) {
  const text = props.text;
  const loading = props.loading;
  const { t } = props.translate;

  return (
    <div className="btn-container subm-button">
      <button type="submit">
        {t(text)}
        {loading && <div className="loader"></div>}
      </button>
    </div>
  );
}

export default Button;
