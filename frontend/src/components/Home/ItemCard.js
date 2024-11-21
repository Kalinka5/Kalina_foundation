import React from "react";

import ItemImage from "./ItemImage";
import ItemDescription from "./ItemDescription";
import DonateButton from "./DonateButton";
import EditItemButton from "./EditItemButton";

import "../../styles/home/itemCard.css";

function ItemCard({ items, isSuperUser }) {
  return items.map((el, index) => (
    <div className="gradient-cards" key={el.id}>
      <div className={`card ${index % 2 === 0 ? "left" : "right"}`}>
        <div className="container-card">
          <div className="column1">
            <ItemImage image={el.image} index={index} />
          </div>
          <div className="column2">
            <ItemDescription title={el.title} />
          </div>
          <div className="item-buttons">
            <DonateButton />
            {isSuperUser && <EditItemButton id={el.id} />}
          </div>
        </div>
      </div>
    </div>
  ));
}

export default ItemCard;
