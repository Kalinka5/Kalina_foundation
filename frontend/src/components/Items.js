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
      <p className="container-title">
        Here are the features
        <br />
        we’re proud of
      </p>

      {items.map((el) => (
        <div className="gradient-cards" key={el.id}>
          <div className="card">
            <div className="container-card bg-green-box">
              <div className="column1">
                <img className="item-image" src={el.image} alt="item1" />
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
