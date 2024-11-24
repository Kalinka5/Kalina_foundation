import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import api from "../../lib/api";

import HeaderSection from "./HeaderSection.tsx";
import ItemCard from "./ItemCard.tsx";
import ItemsLoader from "./LoaderItems";

import { HeaderContext } from "../../App.tsx";

import { Item, User } from "../../lib/types.tsx";

import "../../styles/home/items.css";

function Items() {
  const { n } = useParams();
  const [isSuperUser, setIsSuperUser] = useState(false);

  const authContext = useContext(HeaderContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthContext.Provider");
  }

  const { auth } = authContext;

  useEffect(() => {
    if (auth) {
      (async () => {
        try {
          console.log("Start to sending a request to backend /profile");
          const response = (await api("/profile")) as unknown as User;
          console.log("The request was sending successfully!");
          console.log(response.is_superuser);
          setIsSuperUser(response.is_superuser);
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      })();
    }
  }, [auth]);

  const getItems = async (): Promise<Item[]> => {
    try {
      console.log("Start getting data of items...");
      const response = await api(`/items/?page=${n}&format=json`);
      return response as unknown as Item[];
    } catch (error) {
      console.error("Error fetching items:", (error as Error).message);
      return [];
    }
  };

  const items = useQuery<Item[]>({
    queryKey: ["items"],
    queryFn: getItems,
  });

  if (items.isLoading) {
    return (
      <div className="items">
        <HeaderSection title="items-header" className="back-black" />
        {/* Show loading */}
        <ItemsLoader />
      </div>
    );
  }

  if (items.error) {
    const errorMessage =
      items.error instanceof Error
        ? items.error.message
        : "An unexpected error occurred.";
    return (
      <div className="items">
        <HeaderSection title="items-header" className="back-black" />
        <p className="error">{errorMessage}</p>
      </div>
    );
  }

  return (
    <div className="items">
      <HeaderSection title="items-header" className="back-black" />
      {items.data && <ItemCard items={items.data} isSuperUser={isSuperUser} />}
    </div>
  );
}

export default Items;
