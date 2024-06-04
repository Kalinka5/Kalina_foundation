import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../api";

import "../styles/items.css";

function Items() {
  const { n } = useParams();
  const [items, setItems] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      console.log("Start getting data of items...");
      const res = await api.get(`/items/?page=${n}&format=json`);
      console.log(`Response: ${res}`);
      console.log(`Items: ${res.data}`);
      setItems(res.data);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="items">
      <div className="items-title">
        <p className="container-title">На що ми збираємо</p>
      </div>
      {items &&
        items.map((el, index) => (
          <div className="gradient-cards" key={el.id}>
            <div className={`card ${index % 2 === 0 ? "left" : "right"}`}>
              <div className="container-card">
                <div className="column1">
                  <img
                    className="item-image"
                    src={`/choreo-apis/kalinafond/backend/v1${el.image}`}
                    alt="item1"
                  />
                  <a className="donate-button" href="/donate" target="_blank">
                    <span>Задонатити</span>
                  </a>
                  <a
                    className="donate-button"
                    href={`/item/${el.id}/edit`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>Змінити</span>
                  </a>
                </div>
                <div className="column2">
                  <p className="card-title">{el.title}</p>
                  <p className="card-description">{el.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Items;
