import React from "react";

import MoneyPortrait from "./MoneyPortrait";
import DonatorImg from "./DonatorImg";
import MoneyLandscape from "./MoneyLandscape";
import Username from "./Username";
import Place from "./Place";
import DonatorsLoader from "./LoaderDonators";

import "../../styles/home/pedestal.css";

function Pedestal({ donators, orientation }) {
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
