import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/items.css";
import api from "../api";

function Items() {
  const { n } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await api.get(`/items?page=${n}`);
      console.log(res.data.results);
      setItems(res.data.results);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="items">
      <div className="items-title">
        <p className="container-title">На що ми збираємо</p>
      </div>

      {items.map((el, index) => (
        <div className="gradient-cards" key={el.id}>
          <div className={`card ${index % 2 === 0 ? "left" : "right"}`}>
            <div className="container-card">
              <div className="column1">
                <img className="item-image" src={el.image} alt="item1" />
                <a className="donate-button" href="/donate" target="_blank">
                  <span>Задонатити</span>
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
