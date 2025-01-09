import React, { useState, useEffect } from "react";

import { useTranslation } from "react-i18next";

import api from "../../lib/api";

import image from "../../img/donate-bpla.jpg";

import { DONATION_ITEM_ID } from "../../lib/constants";

import "../../styles/payment/donateInfo.css";

export const DonateInfo = () => {
  const [progress, setProgress] = useState(0);
  const [goal, setGoal] = useState(0);
  const [initialDonation, setInitialDonation] = useState(0);

  const { t } = useTranslation();

  useEffect(() => {
    getDonationData();

    // Animate progress bar
    const startProgress = 0;
    const endProgress = (initialDonation / goal) * 100;
    const duration = 10;
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
      const item = await api(`/items/${DONATION_ITEM_ID}/?format=json`);
      setGoal(item.full_price);
      setInitialDonation(item.collected);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="donate-card">
      <div className="image">
        <img src={image} alt="BPLA"></img>
      </div>
      <div className="donate-desc">
        <h2>"{t("img-head")}"</h2>
        <div className="donate-text">
          <span className="text-left">
            <a href="/donate" disabled>
              <i>{t("img-text1")}</i>
            </a>
          </span>
          <span className="text-right">{t("img-text2")}</span>
        </div>
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
  );
};
