import React from "react";

import { DonatorImgProps } from "../../../lib/types";

import "../../../styles/home/donators/donatorImg.css";

function DonatorImg({ image }: DonatorImgProps) {
  return (
    <div className="profile-pic">
      <img className="profile-pic-image" src={image} alt="Donator" />
    </div>
  );
}

export default DonatorImg;
