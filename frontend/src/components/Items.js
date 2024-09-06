import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../api";

import { API_URL } from "../constants";

import ItemsLoader from "./ItemsLoader";

import "../styles/items.css";

function Items(props) {
  const { n } = useParams();
  const [items, setItems] = useState(null);
  const [isSuperUser, setIsSuperUser] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      console.log("Start getting data of items...");
      await new Promise((r) => setTimeout(r, 30000));
      const resItems = await api.get(`/items/?page=${n}&format=json`);
      setItems(resItems.data);

      if (props.isAuth) {
        console.log("Start getting data of profile...");
        const res = await api.get("/profile");
        setIsSuperUser(res.data.is_superuser);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="items">
      <div className="items-title">
        <p className="container-title">На що ми збираємо</p>
      </div>
      {items ? (
        items.map((el, index) => (
          <div className="gradient-cards" key={el.id}>
            <div className={`card ${index % 2 === 0 ? "left" : "right"}`}>
              <div className="container-card">
                <div className="column1">
                  <img
                    className="item-image"
                    src={API_URL + el.image}
                    alt="item1"
                  />
                  <div className="item-buttons">
                    <a className="donate-button" href="/donate" target="_blank">
                      <span>Задонатити</span>
                    </a>
                    {isSuperUser && (
                      <a
                        className="edit-button"
                        href={`/item/${el.id}/edit`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span>Змінити</span>
                      </a>
                    )}
                  </div>
                </div>
                <div className="column2">
                  <p className="card-title">{el.title}</p>
                  <p className="card-description">{el.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <ItemsLoader />
      )}
    </div>
  );
}

export default Items;
