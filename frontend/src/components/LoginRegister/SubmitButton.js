import React from "react";

import "../../styles/loginRegister/submitButton.css";

function SubmitButton(props) {
  const text = props.text;
  const loading = props.loading;
  const { t } = props.translate;

  return (
    <button type="submit" className="submit-but">
      {t(text)}
      {loading && <div className="loader"></div>}
    </button>
  );
}

export default SubmitButton;
