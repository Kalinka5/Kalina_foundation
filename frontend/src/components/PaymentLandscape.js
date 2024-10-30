import React, { createContext, useState, useEffect } from "react";

import { IoIosHelpCircle, IoIosBrowsers, IoIosCheckmark } from "react-icons/io";

import { useTranslation } from "react-i18next";

import api from "../api";

import PayPal from "./PayPalButton";

import ChangeDonMethod from "./ChangeDonateMethod";

import image from "../img/donate-bpla.jpg";

import "../styles/paymentLandscape.css";

export const PaymentContext = createContext([{}]);

export const PaymentLandscape = () => {
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
      const item = await api.get(`/items/18/?format=json`);
      setGoal(item.data["full_price"]);
      setInitialDonation(item.data["collected"]);
    } catch (err) {
      console.log(err);
    }
  };

  const [recCoppied, setRecCoppied] = useState(false);
  const [ibanCoppied, setIbanCoppied] = useState(false);
  const [innCoppied, setInnCoppied] = useState(false);
  const [titleCoppied, setTitleCoppied] = useState(false);

  const recipient = "Каліневич Данііл Олександрович";
  const iban = "UA863052990000026201737711936";
  const inn = "3765604679";
  const title = "Благодійний безповоротний внесок";

  const clickCopyRec = () => {
    navigator.clipboard.writeText(recipient);
    setRecCoppied(true);
    setInterval(function () {
      setRecCoppied(false);
    }, 5000);
  };
  const clickCopyIban = () => {
    navigator.clipboard.writeText(iban);
    setIbanCoppied(true);
    setInterval(function () {
      setIbanCoppied(false);
    }, 5000);
  };
  const clickCopyInn = () => {
    navigator.clipboard.writeText(inn);
    setInnCoppied(true);
    setInterval(function () {
      setInnCoppied(false);
    }, 5000);
  };
  const clickCopyTitle = () => {
    navigator.clipboard.writeText(title);
    setTitleCoppied(true);
    setInterval(function () {
      setTitleCoppied(false);
    }, 5000);
  };

  return (
    <div className="pc-version">
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
          className={`payment-methods ${currentDonation === 2 ? "others" : ""}`}
        >
          <div className="article-wrapper front">
            <figure>
              <div className="container-mastercard">
                <div className="front-card front-hov">
                  <div className="column1">
                    <h3 id="main-title">
                      monobank | <span>Universal Bank</span>
                    </h3>
                    <div id="chip"></div>
                    <div className="card-info">
                      <p id="no">5375 4141 2253 7789</p>
                      <div className="grid-date">
                        <p id="name">Daniil Kalinevych</p>
                        <p id="exp-date">dd/yy</p>
                      </div>
                    </div>
                  </div>
                  <div className="column2">
                    <i id="globe" className="fa fa-globe"></i>
                    <div id="mastercard"></div>
                  </div>
                </div>
              </div>
            </figure>
            <div className="article-body mono-body">
              <p id="monobanka-p">{t("monobanka-p")}</p>
              <a
                href="https://send.monobank.ua/jar/QsATQ1NQ4"
                target="_blank"
                rel="noreferrer"
              >
                {t("monobank")}
              </a>
            </div>
          </div>
          <div className="article-wrapper back"></div>
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
          className={`payment-methods ${currentDonation === 2 ? "others" : ""}`}
        >
          <div className="article-wrapper front">
            <figure>
              <div className="container-visa">
                <div
                  className={`front front-hov ${
                    currentDonation === 1 ? "img-z-1" : ""
                  }`}
                >
                  <img
                    src="https://i.ibb.co/PYss3yv/map.png"
                    className="map-img"
                    alt="Map"
                  />
                  <div className="row p-r-15 p-l-15 p-t-15">
                    <img
                      src="https://i.ibb.co/G9pDnYJ/chip.png"
                      width="50px"
                      alt="Chip"
                      className="chip-img"
                    />
                    <img
                      src="https://i.ibb.co/WHZ3nRJ/visa.png"
                      width="50px"
                      alt="Visa"
                      className="visa-img"
                    />
                  </div>
                  <div className="row card-no p-r-15 p-l-15">
                    <p>4149</p>
                    <p>4390</p>
                    <p>2438</p>
                    <p>4293</p>
                  </div>
                  <div className="row card-holder p-r-15 p-l-15">
                    <p>CARD HOLDER</p>
                    <p>VALID TILL</p>
                  </div>
                  <div className="row name p-r-15 p-l-15 p-b-15">
                    <p>Daniil Kalinevych</p>
                    <p>dd / yy</p>
                  </div>
                </div>
              </div>
            </figure>
            <div id="visa-desc" className="article-body">
              <div>
                <label>{t("recipient")}</label>
                <div className="input-box">
                  <input
                    className="number"
                    type="text"
                    defaultValue={recipient}
                    disabled
                    readOnly
                  />
                  <span className="copy-toggle-icon" onClick={clickCopyRec}>
                    {recCoppied ? (
                      <i className="checkmark">
                        <IoIosCheckmark />
                      </i>
                    ) : (
                      <i className="copy">
                        <IoIosBrowsers />
                      </i>
                    )}
                  </span>
                </div>
              </div>
              <div>
                <label>IBAN</label>
                <div className="input-box">
                  <input
                    className="number"
                    type="text"
                    defaultValue={iban}
                    disabled
                    readOnly
                  />
                  <span className="copy-toggle-icon" onClick={clickCopyIban}>
                    {ibanCoppied ? (
                      <i className="checkmark">
                        <IoIosCheckmark />
                      </i>
                    ) : (
                      <i className="copy">
                        <IoIosBrowsers />
                      </i>
                    )}
                  </span>
                </div>
              </div>
              <div>
                <label>{t("rnokpp")}</label>
                <div className="input-box">
                  <input
                    className="inputname"
                    type="text"
                    defaultValue={inn}
                    disabled
                    readOnly
                  />
                  <span className="copy-toggle-icon" onClick={clickCopyInn}>
                    {innCoppied ? (
                      <i className="checkmark">
                        <IoIosCheckmark />
                      </i>
                    ) : (
                      <i className="copy">
                        <IoIosBrowsers />
                      </i>
                    )}
                  </span>
                </div>
              </div>
              <div>
                <label>{t("title")}</label>
                <div className="input-box">
                  <input
                    className="expire"
                    type="text"
                    defaultValue={title}
                    disabled
                    readOnly
                  />
                  <span className="copy-toggle-icon" onClick={clickCopyTitle}>
                    {titleCoppied ? (
                      <i className="checkmark">
                        <IoIosCheckmark />
                      </i>
                    ) : (
                      <i className="copy">
                        <IoIosBrowsers />
                      </i>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="article-wrapper back">
            <PayPal />
          </div>
        </article>
      </div>
      <PaymentContext.Provider value={{ currentDonation, setCurrentDonation }}>
        <ChangeDonMethod />
      </PaymentContext.Provider>
    </div>
  );
};
