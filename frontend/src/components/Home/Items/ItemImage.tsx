import React from "react";

import { ItemImageProps } from "../../../lib/types";

import "../../../styles/home/items/itemImage.css";

function ItemImage({ image, index }: ItemImageProps) {
  const altImageName = `item${index + 1}`;
  return <img className="item-image" src={image} alt={altImageName} />;
}

export default ItemImage;
