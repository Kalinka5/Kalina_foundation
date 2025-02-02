import React from "react";
import { useTranslation } from "react-i18next";

import { HeaderSectionProps } from "../../lib/types";

import "../../styles/home/headerSection.css";

function HeaderSection({ title, className, children }: HeaderSectionProps) {
  const { t } = useTranslation();

  return (
    <div className={`title-container ${className}`}>
      {children && children.map((el) => el)}
      <div className="title">
        <p className="title-p">{t(title)}</p>
      </div>
    </div>
  );
}

export default HeaderSection;
