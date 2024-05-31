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

import api from "../api";

import "../styles/donaters.css";

function Donaters() {
  const [donators, setDonators] = useState([]);
  const [titleIcons, setTitleIcons] = useState([]);
  const [cardIcons, setCardIcons] = useState([]);
  const places = {
    0: <Fa1 />,
    1: <Fa2 />,
    2: <Fa3 />,
    3: <Fa4 />,
    4: <Fa5 />,
  };

  useEffect(() => {
    getData();
    createTitleIcons();
    createCardIcons();
  }, []);

  const getData = async () => {
    try {
      const res = await api.get("/donators");
      console.log(res.data);
      setDonators(res.data);
    } catch (err) {
      alert(err);
    }
  };

  const createTitleIcons = async () => {
    const icons = [];
    const iconsDiv = [];

    for (let i = 1; i <= 21; i++) {
      iconsDiv.push(
        <i className="title-icons" key={i}>
          <IoIosCash />
        </i>
      );
    }

    for (let i = 1; i <= 12; i++) {
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
    <div className="donaters">
      <div className="donators-title">
        {titleIcons.map((el) => el)}
        <div className="title">
          <p className="container-title">Топ Донатерів</p>
        </div>
      </div>
      <div className="donators-background">
        <div className="icons-back">
          {cardIcons.map((el) => el)}
          <div className="donators-card">
            <div className="pedestal">
              {donators &&
                donators.map((user, index) => (
                  <div className={`bar __${index + 1}`} key={user.id}>
                    <div className="profile-pic">
                      <img
                        className="profile-pic-image"
                        src={process.env.REACT_APP_API_URL + user.image}
                        alt="Donater"
                      />
                    </div>
                    <div className="donated">
                      <p>Задонатив/ла {user.donated} грн.</p>
                    </div>
                    <div className="underline"></div>
                    <div className="username">{user.username}</div>
                    <div className="icon-background">
                      <i className={`icon color${index + 1}`}>
                        {places[index]}
                      </i>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Donaters;
