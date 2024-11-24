import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import HeaderSection from "./HeaderSection.tsx";
import ItemCard from "./ItemCard.tsx";
import ItemsLoader from "./LoaderItems";

import { HeaderContext } from "../../App.tsx";

import { User } from "../../lib/types.tsx";

import { useItems, useUser } from "../../lib/hooks.tsx";

import "../../styles/home/items.css";

function Items() {
  const { n } = useParams();
  const [isSuperUser, setIsSuperUser] = useState(false);

  const authContext = useContext(HeaderContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthContext.Provider");
  }

  const { auth } = authContext;

  const items = useItems(n ?? "1");

  const user = useUser(auth);

  useEffect(() => {
    if (user.data && "username" in user.data) {
      const userData = user.data as User;
      setIsSuperUser(userData.is_superuser);
    }
  }, [user.data]);

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
