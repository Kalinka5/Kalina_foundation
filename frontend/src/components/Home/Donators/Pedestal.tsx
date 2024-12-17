import React from "react";

import DonatorImg from "./DonatorImg.tsx";
import MoneyLandscape from "./MoneyLandscape.tsx";
import MoneyPortrait from "./MoneyPortrait.tsx";
import Username from "./Username.tsx";
import Place from "./Place.tsx";
import DonatorsLoader from "./LoaderDonators.js";

import { PedestalProps } from "../../../lib/types.tsx";

import "../../../styles/home/donators/pedestal.css";

function Pedestal({ donators, orientation }: PedestalProps) {
  return (
    <div className={`pedestal ${donators ? "grid-p" : "flex-l"}`}>
      {donators ? (
        donators.map((user, index) => (
          <div className={`bar __${index + 1}`} key={user.id}>
            {orientation === "portrait" && (
              <MoneyPortrait donated={user.donated} />
            )}
            <DonatorImg image={user.image} />
            {orientation === "landscape" && (
              <MoneyLandscape donated={user.donated} />
            )}
            <Username username={user.username} />
            <Place index={index} />
          </div>
        ))
      ) : (
        <DonatorsLoader />
      )}
    </div>
  );
}

export default Pedestal;
