import React from "react";
import { useTranslation } from "react-i18next";

import "../../styles/home/headerSection.css";

function HeaderSection({ title, className, titleIcons = "" }) {
  const { t } = useTranslation();

  return (
    <div className={`title-container ${className}`}>
      {titleIcons && titleIcons.map((el) => el)}
      <div className="title">
        <p className="title-p">{t(title)}</p>
      </div>
    </div>
  );
}

export default HeaderSection;
