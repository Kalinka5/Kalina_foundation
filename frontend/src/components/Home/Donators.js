import React, { useEffect, useState } from "react";

import { Fa1, Fa2, Fa3, Fa4, Fa5 } from "react-icons/fa6";
import {
  IoIosCash,
  IoIosAirplane,
  IoIosCard,
  IoIosCellular,
  IoIosJet,
  IoIosTrophy,
  IoMdHeart,
} from "react-icons/io";

import { useTranslation } from "react-i18next";

import { useMediaQuery } from "@uidotdev/usehooks";

import api from "../../api";

import useOrientation from "../../useOrientation";

import image from "../../img/winner.png";

import DonatorsLoader from "./LoaderDonators";

import "../../styles/home/donators.css";

function Donators() {
  const [donators, setDonators] = useState(null);
  const [titleIcons, setTitleIcons] = useState([]);
  const [cardIcons, setCardIcons] = useState([]);
  const places = {
    0: <Fa1 />,
    1: <Fa2 />,
    2: <Fa3 />,
    3: <Fa4 />,
    4: <Fa5 />,
  };
  const isDisplayMini = useMediaQuery(
    "only screen and (min-width: 300px) and (max-width: 1024px)"
  );
  const isDisplayMax = useMediaQuery(
    "only screen and (min-width: 1025px) and (max-width: 3000px)"
  );
  const isMonitor = useMediaQuery(
    "only screen and (min-width: 1500px) and (max-width: 3000px)"
  );
  const orientation = useOrientation();

  const { t } = useTranslation();

  useEffect(() => {
    getData();
    createTitleIcons();
    createCardIcons();
  }, []);

  const getData = async () => {
    try {
      const res = await api.get("/donators?format=json");
      console.log(`Response: ${res.data}`);
      console.log(`Donators: ${res.data}`);
      setDonators(res.data);
    } catch (err) {
      alert(err);
    }
  };

  const createTitleIcons = async () => {
    const icons = [];
    const iconsDiv = [];

    for (let i = 1; i <= 35; i++) {
      iconsDiv.push(
        <i className="title-icons" key={i}>
          <IoIosCash />
        </i>
      );
    }

    for (let i = 1; i <= 15; i++) {
      icons.push(
        <div className="icon-row title-row" key={i}>
          <div className="ic">{iconsDiv.map((el) => el)}</div>
          <div className="ic">{iconsDiv.map((el) => el)}</div>
        </div>
      );
    }
    setTitleIcons(icons);
  };

  const createCardIcons = async () => {
    const icons = [
      <IoIosAirplane />,
      <IoIosCard />,
      <IoIosCellular />,
      <IoIosJet />,
      <IoIosTrophy />,
      <IoMdHeart />,
    ];

    const iconsBack = [];
    const iconsDiv = [];
    let n = 0;

    for (let i = 1; i <= 21; i++) {
      n > 5 && (n = 0);
      iconsDiv.push(
        <i className="title-icons" key={i}>
          {icons[n]}
        </i>
      );
      n++;
    }

    for (let i = 1; i <= 7; i++) {
      iconsBack.push(
        <div className="icon-row card-row" key={i}>
          <div className="ic">{iconsDiv.map((el) => el)}</div>
          <div className="ic">{iconsDiv.map((el) => el)}</div>
        </div>
      );
    }
    setCardIcons(iconsBack);
  };

  return (
    <div className="donators">
      <div className="donators-title">
        {titleIcons.map((el) => el)}
        <div className="title">
          <p className="container-title">{t("donators-header")}</p>
        </div>
      </div>
      <div className="donators-background">
        {orientation.isLandscape && isDisplayMax && (
          <div className={`card-img ${isMonitor && "mon-wid"}`}>
            <div className="content">
              <div className={`imgBx ${isMonitor && "monitor-img"}`}>
                <img src={image} alt="Winner" />
              </div>
              <div className="contentBx">
                <h3>
                  {t("donators-h")}
                  <br />
                  <span>{t("donators-p")}</span>
                </h3>
              </div>
            </div>
            <ul className="sci">
              <li>
                <a href="/donate">Monobank</a>
              </li>
              <li>
                <a href="/donate">Privat24</a>
              </li>
            </ul>
          </div>
        )}
        <div
          className={`icons-back ${
            (orientation.isPortrait || isDisplayMini) && "portrait"
          }`}
        >
          {cardIcons.map((el) => el)}
          <div className="donators-card">
            {isMonitor ? (
              <div className={`pedestal ${donators ? "grid-p" : "flex-l"}`}>
                {donators ? (
                  donators.map((user, index) => (
                    <div className={`bar __${index + 1}`} key={user.id}>
                      <div className="profile-pic">
                        <img
                          className="profile-pic-image"
                          src={user.image}
                          alt="Donater"
                        />
                      </div>
                      <div className="donated">
                        <p>
                          {t("donated")} {user.donated} {t("uah")}
                        </p>
                      </div>
                      <div className="underline"></div>
                      <div className="username">{user.username}</div>
                      <div className="icon-background">
                        <i className={`icon color${index + 1}`}>
                          {places[index]}
                        </i>
                      </div>
                    </div>
                  ))
                ) : (
                  <DonatorsLoader />
                )}
              </div>
            ) : (
              <div className={`pedestal ${donators ? "grid-p" : "flex-l"}`}>
                {donators ? (
                  donators.map((user, index) => (
                    <div className={`bar __${index + 1}`} key={user.id}>
                      <div className="money-value">
                        ({user.donated} {t("uah")})
                      </div>
                      <div className="profile-pic">
                        <img
                          className="profile-pic-image"
                          src={user.image}
                          alt="Donater"
                        />
                      </div>
                      <div className="username">{user.username}</div>
                      <div className="icon-background">
                        <i className={`icon color${index + 1}`}>
                          {places[index]}
                        </i>
                      </div>
                    </div>
                  ))
                ) : (
                  <DonatorsLoader />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Donators;
