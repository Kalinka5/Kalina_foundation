import React, { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { IoIosCash } from "react-icons/io";

import { useMediaQuery } from "@uidotdev/usehooks";

import api from "../../lib/api.js";

import useOrientation from "../../lib/useOrientation.js";

import HeaderSection from "./HeaderSection.tsx";
import CardIcons from "./CardIcons.js";
import CardImage from "./CardImage.js";
import Pedestal from "./Pedestal.tsx";

import { User } from "../../lib/types.tsx";

import { useDonators } from "../../lib/hooks.tsx";

import "../../styles/home/donators.css";

function Donators() {
  const [titleIcons, setTitleIcons] = useState<JSX.Element[]>([]);

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
    createTitleIcons();
  }, []);

  const createTitleIcons = async () => {
    const icons: JSX.Element[] = [];
    const iconsDiv: JSX.Element[] = [];

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

  const donators = useDonators();
  const donatorData = donators.data ?? [];

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
              <Pedestal donators={donatorData} orientation="landscape" />
            ) : (
              <Pedestal donators={donatorData} orientation="portrait" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Donators;
