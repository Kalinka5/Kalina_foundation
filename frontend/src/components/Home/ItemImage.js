import React from "react";

import "../../styles/home/itemImage.css";

function ItemImage({ image, index }) {
  const altImageName = `item${index + 1}`;
  return <img className="item-image" src={image} alt={altImageName} />;
}

export default ItemImage;
