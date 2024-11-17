import React, { createContext, useState, useEffect } from "react";

import { IoIosHelpCircle } from "react-icons/io";

import { useTranslation } from "react-i18next";

import api from "../../api";

import { MonoBank } from "./MonoMethod";
import { PrivatBank } from "./PrivatMethod";
import PaypalMethod from "./PayPalMethod";
import CryptoPaymentsForm from "./CryptoMethod";
import ChangeDonateMethod from "./ChangeDonateMethod";

import image from "../../img/donate-bpla.jpg";

import { DONATION_ITEM_ID } from "../../constants";

import "../../styles/paymentLandscape.css";

export const PaymentLandscapeContext = createContext([{}]);

export const PaymentLandscape = (props) => {
  const isAuth = props.isAuth;

  const [progress, setProgress] = useState(0);
  const [goal, setGoal] = useState(0);
  const [initialDonation, setInitialDonation] = useState(0);

  const [currentDonation, setCurrentDonation] = useState(1);

  const { t } = useTranslation();

  useEffect(() => {
    getDonationData();

    // Animate progress bar
    const startProgress = 0;
    const endProgress = (initialDonation / goal) * 100;
    const duration = 10; // 2 seconds
    const startTime = performance.now();

    const animateProgress = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progressPercentage = Math.min(
        startProgress +
          (elapsedTime / duration) * (endProgress - startProgress),
        endProgress
      );

      setProgress(progressPercentage);

      if (elapsedTime < duration) {
        requestAnimationFrame(animateProgress);
      }
    };

    requestAnimationFrame(animateProgress);
  }, [goal]);

  const getDonationData = async () => {
    try {
      console.log("Start getting data of Donation item...");
      const item = await api.get(`/items/${DONATION_ITEM_ID}/?format=json`);
      setGoal(item.data["full_price"]);
      setInitialDonation(item.data["collected"]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="pc-version">
      <PaymentLandscapeContext.Provider
        value={{ currentDonation, setCurrentDonation }}
      >
        <div className="payment-header">
          <span className="questions left-q">
            {t("q1-head")}
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
          <button disabled className="button-arounder">
            {t("donate-page")}
          </button>
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
            {t("q2-head")}
          </span>
        </div>
        <div className="cards">
          <article
            className={`payment-methods ${
              currentDonation === 2 ? "others" : ""
            }`}
          >
            <div className="article-wrapper front">
              <MonoBank />
            </div>
            <div className="article-wrapper back">
              <CryptoPaymentsForm isAuth={isAuth} />
            </div>
          </article>
          <article>
            <div className="article-wrapper">
              <div className="donate-card">
                <div className="image">
                  <img src={image} alt="BPLA"></img>
                </div>
                <div className="donate-desc">
                  <h2>"{t("img-head")}"</h2>
                  <span className="text-left">
                    <a href="/donate" disabled>
                      <i>{t("img-text1")}</i>
                    </a>
                  </span>
                  <span className="text-right">{t("img-text2")}</span>
                  <div className="progress-desc">
                    <div className="progress-text">
                      <span className="donated-text">
                        {initialDonation} {t("uah")}
                      </span>
                      <span className="goal-text">
                        {t("img-goal")} {goal} {t("uah")}
                      </span>
                    </div>
                    <div className="progress">
                      <div
                        className="progress-value"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
          <article
            className={`payment-methods ${
              currentDonation === 2 ? "others" : ""
            }`}
          >
            <div className="article-wrapper front">
              <PrivatBank />
            </div>
            <div className="article-wrapper back">
              <PaypalMethod />
            </div>
          </article>
        </div>

        <ChangeDonateMethod />
      </PaymentLandscapeContext.Provider>
    </div>
  );
};
