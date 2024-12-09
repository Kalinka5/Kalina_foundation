import React, { useState, useRef, useEffect } from "react";

import ItemImage from "./ItemImage.tsx";
import ItemDescription from "./ItemDescription.tsx";
import DonateButton from "./DonateButton";
import EditItemButton from "./EditItemButton.tsx";

import { ItemCardProps } from "../../../lib/types.tsx";

import "../../../styles/home/itemCard.css";

function ItemCard({ items, isSuperUser }: ItemCardProps) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    });
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [isIntersecting]);

  useEffect(() => {
    if (!ref.current) return;

    if (isIntersecting) {
      ref.current.querySelectorAll("div").forEach((el) => {
        const childElement = el.querySelector(".card"); // Adjust the selector to match your child element
        if (childElement) {
          childElement.classList.add("slide-in");
        }
      });
    } else {
      ref.current.querySelectorAll("div").forEach((el) => {
        const childElement = el.querySelector(".card"); // Adjust the selector to match your child element
        if (childElement) {
          childElement.classList.remove("slide-in");
        }
      });
    }
  }, [isIntersecting]);

  return (
    <div className="items-main">
      <div className="container" ref={ref}>
        {items.map((el, index) => (
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
        ))}
      </div>
    </div>
  );
}

export default ItemCard;
