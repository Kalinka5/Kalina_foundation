import React, { useContext } from "react";

import HeaderSection from "./HeaderSection.tsx";
import ItemCard from "./ItemCard.tsx";
import ItemsLoader from "./LoaderItems";

import { HeaderContext } from "../../App.tsx";

import { useItems, useUser } from "../../lib/hooks.tsx";

import { ItemsProps } from "../../lib/types.tsx";

import "../../styles/home/items.css";

function Items({ page }: ItemsProps) {
  const authContext = useContext(HeaderContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthContext.Provider");
  }

  const { auth } = authContext;

  // Get Items data from backend
  const items = useItems(page);

  // Get data is user is super user (true or false)
  const isSuperUser = useUser(auth);

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
