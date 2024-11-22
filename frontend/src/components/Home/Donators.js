import React, { useEffect, useState } from "react";

import { IoIosCash } from "react-icons/io";

import { useMediaQuery } from "@uidotdev/usehooks";

import api from "../../lib/api";

import useOrientation from "../../lib/useOrientation";

import HeaderSection from "./HeaderSection.tsx";
import CardIcons from "./CardIcons";
import CardImage from "./CardImage";
import Pedestal from "./Pedestal.tsx";

import "../../styles/home/donators.css";

function Donators() {
  const [donators, setDonators] = useState(null);
  const [titleIcons, setTitleIcons] = useState([]);

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

  useEffect(() => {
    getData();
    createTitleIcons();
  }, []);

  const getData = async () => {
    try {
      const res = await api.get("/donators?format=json");
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

  return (
    <div className="donators">
      <HeaderSection title="items-header" className="back-violet">
        {titleIcons}
      </HeaderSection>
      <div className="donators-background">
        {orientation.isLandscape && isDisplayMax && <CardImage />}

        <div
          className={`icons-back ${
            (orientation.isPortrait || isDisplayMini) && "portrait"
          }`}
        >
          <CardIcons />
          <div className="donators-card">
            {isMonitor ? (
              <Pedestal donators={donators} orientation="landscape" />
            ) : (
              <Pedestal donators={donators} orientation="portrait" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Donators;
