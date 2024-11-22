import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import api from "../../lib/api";

import HeaderSection from "./HeaderSection";
import ItemCard from "./ItemCard";
import ItemsLoader from "./LoaderItems";

import { AuthContext } from "../../App.tsx";

import "../../styles/home/items.css";

function Items() {
  const { n } = useParams();
  const [items, setItems] = useState<Item[]>([]);
  const [isSuperUser, setIsSuperUser] = useState(false);

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthContext.Provider");
  }

  const { auth } = authContext;

  useEffect(() => {
    getData();
  }, [auth]);

  const getData = async () => {
    try {
      console.log("Start getting data of items...");
      const resItems = await api.get(`/items/?page=${n}&format=json`);
      setItems(resItems.data);

      if (auth) {
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
      <HeaderSection title="items-header" className="back-black" />
      {items ? (
        <ItemCard items={items} isSuperUser={isSuperUser} />
      ) : (
        <ItemsLoader />
      )}
    </div>
  );
}

export default Items;
