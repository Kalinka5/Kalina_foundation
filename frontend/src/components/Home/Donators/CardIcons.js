import React, { useEffect, useState } from "react";

import {
  IoIosAirplane,
  IoIosCard,
  IoIosCellular,
  IoIosJet,
  IoIosTrophy,
  IoMdHeart,
} from "react-icons/io";

import "../../../styles/home/donators/cardIcons.css";

function CardIcons() {
  const [cardIcons, setCardIcons] = useState([]);

  useEffect(() => {
    createCardIcons();
  }, []);

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

    for (let i = 1; i <= 11; i++) {
      iconsBack.push(
        <div className="icon-row card-row" key={i}>
          <div className="ic">{iconsDiv.map((el) => el)}</div>
          <div className="ic">{iconsDiv.map((el) => el)}</div>
        </div>
      );
    }
    setCardIcons(iconsBack);
  };

  return <div className="pedestal-icons">{cardIcons.map((el) => el)}</div>;
}

export default CardIcons;
