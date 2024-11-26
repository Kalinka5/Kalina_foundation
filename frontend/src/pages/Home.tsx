import React, { useContext, useState } from "react";

import Slider from "../components/Home/Slider.tsx";
import Items from "../components/Home/Items.tsx";
import Donators from "../components/Home/Donators.tsx";
import Footer from "../components/Footer.js";
import Header from "../components/Header.tsx";

import { MAX_PAGE_NUMBER } from "../lib/constants.js";

import NotFound from "./NotFound.js";

import { HeaderContext } from "../App.tsx";

function Home() {
  const [page, setPage] = useState(1);

  const authContext = useContext(HeaderContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthContext.Provider");
  }

  return (
    <div className="main">
      <Header fixed="pos-fixed" />
      {page > 0 && page < MAX_PAGE_NUMBER ? (
        <>
          <Slider page={page} setPage={setPage} />
          <Items page={page} />
          <Donators />
          <Footer />
        </>
      ) : (
        <NotFound />
      )}
    </div>
  );
}

export default Home;
