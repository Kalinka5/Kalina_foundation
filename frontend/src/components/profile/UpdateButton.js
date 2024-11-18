import React, { useContext } from "react";

import { useTranslation } from "react-i18next";

import { ProfileContext } from "../../pages/Profile";

import "../../styles/profile/updateButton.css";

function UpdateButton() {
  const { loading } = useContext(ProfileContext);

  const { t } = useTranslation();

  return (
    <div className="btn-container">
      <button type="submit" id="submit2">
        {t("submit")}
        {loading && <div className="loader"></div>}
      </button>
    </div>
  );
}

export default UpdateButton;
