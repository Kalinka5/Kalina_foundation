import React from "react";

import { useTranslation } from "react-i18next";

import TextContainer from "./TextContainer.tsx";
import TextPart from "./TextPart.tsx";
import SliderList from "./SliderList.tsx";
import ArrowDown from "./ArrowDown.tsx";

import "../../../styles/home/slider/sliderText.css";

function SliderText({ isPortrait }) {
  const { t } = useTranslation();

  const listDonateItems = [
    t("donate-items-1"),
    t("donate-items-2"),
    t("donate-items-3"),
    t("donate-items-4"),
  ];
  const listDonateMethods = [
    t("donate-methods-1"),
    t("donate-methods-2"),
    t("donate-methods-3"),
    t("donate-methods-4"),
  ];

  return (
    <div className="text-description">
      <TextContainer className="text-center">
        <div className="text-logo-container">
          <h1 className="logo-text">
            <span>Kalina</span>&nbsp;
            <span>Foundataion</span>
          </h1>
          <p className="logo-slogan">{t("slider-slogan")}</p>
        </div>
      </TextContainer>

      <TextContainer className={`${!isPortrait && "text-columns"}`}>
        <TextPart
          header={t("slider-header-1")}
          text={t("slider-text-1")}
          className={isPortrait && "center"}
        />
        {!isPortrait && (
          <TextPart
            header={t("slider-header-2")}
            text={t("slider-text-2")}
            className={isPortrait ? "center" : "right"}
          />
        )}
      </TextContainer>

      <TextContainer className={"text-columns"}>
        <TextPart
          header={t("slider-header-3")}
          text={t("slider-text-3")}
          className={isPortrait && "center"}
          classMobile={isPortrait && "mobile"}
        >
          <SliderList
            classContainer={isPortrait && "mobile"}
            classList={`bullets ${isPortrait && "center"}`}
          >
            {listDonateItems}
          </SliderList>
        </TextPart>

        {!isPortrait && (
          <TextPart
            header={t("slider-header-3")}
            text={t("slider-text-3")}
            className="right"
          >
            <SliderList classContainer="right" classList="bags">
              {listDonateMethods}
            </SliderList>
          </TextPart>
        )}
      </TextContainer>

      <TextContainer className={"text-center"}>
        <h2 className="text-title">{t("slider-header-5")}</h2>
        <p className="text">
          {t("slider-text-5")}
          <br />
          <span>
            <a href="/donate" target="_blank">
              {t("slider-text-link")}
            </a>
          </span>
        </p>
      </TextContainer>

      <ArrowDown />
    </div>
  );
}

export default SliderText;
