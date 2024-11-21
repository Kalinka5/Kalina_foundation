import React from "react";

import "../../styles/home/donatorImg.css";

function DonatorImg({ image }) {
  return (
    <div className="profile-pic">
      <img className="profile-pic-image" src={image} alt="Donator" />
    </div>
  );
}

export default DonatorImg;
