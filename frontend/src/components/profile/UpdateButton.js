import React, { useContext } from "react";

import { useTranslation } from "react-i18next";

import { ProfileContext } from "../../pages/Profile";

import "../../styles/profile/updateButton.css";

function UpdateButton() {
  const { loading } = useContext(ProfileContext);

  const { t } = useTranslation();

  return (
    <button type="submit" id="update-user">
      {t("submit")}
      {loading && <div className="loader"></div>}
    </button>
  );
}

export default UpdateButton;
