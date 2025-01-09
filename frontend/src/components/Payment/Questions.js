import React from "react";

import { IoIosHelpCircle } from "react-icons/io";

import { useTranslation } from "react-i18next";

import "../../styles/payment/questions.css";

export const Question1 = () => {
  const { t } = useTranslation();

  return (
    <span className="questions left-q">
      <p className="question">{t("q1-head")}</p>
      <div className="tooltip">
        <IoIosHelpCircle className="question-icon" />
        <span className="tooltiptext">
          {t("q1-text1")}
          <br />
          <br />
          {t("q1-text2")}
          <br />
          <br />
          {t("q1-text3")}
          <b>
            <i>username</i>
          </b>{" "}
          {t("q1-text4")}
        </span>
      </div>
    </span>
  );
};

export const Question2 = () => {
  const { t } = useTranslation();

  return (
    <span className="questions right-q">
      <div className="tooltip">
        <IoIosHelpCircle className="question-icon" />
        <span className="tooltiptext">
          {t("q2-text1")} <b>{t("q2-text2")}</b>.<br /> {t("q2-text3")}
          <b>
            <i>{t("q2-text4")} </i>
          </b>
          {t("q2-text5")}
          <b>
            <i>{t("q2-text6")}</i>
          </b>
          .<br /> {t("q2-text7")}
          <b>
            <i>{t("q2-text8")}</i>
          </b>
          {t("q2-text9")}
        </span>
      </div>
      <p className="question">{t("q2-head")}</p>
    </span>
  );
};

export const QuestionPortrait = () => {
  const { t } = useTranslation();

  return (
    <div className="mob-tooltip">
      <IoIosHelpCircle className="question-icon" />
      {t("q1-head")}
      <span className="tooltiptext">
        {" "}
        {t("q1-text1")}
        <br />
        <br />
        {t("q1-text2")}
        <br />
        <br />
        {t("q1-text3")}
        <b>
          <i>username</i>
        </b>{" "}
        {t("q1-text4")}
      </span>
    </div>
  );
};
