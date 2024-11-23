import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import Slider from "../components/Home/Slider.js";
import Items from "../components/Home/Items.tsx";
import Donators from "../components/Home/Donators.tsx";
import Footer from "../components/Footer.js";
import Header from "../components/Header.tsx";

import { MAX_PAGE_NUMBER } from "../lib/constants.js";

import NotFound from "./NotFound.js";

import { HeaderContext } from "../App.tsx";

function Home() {
  const authContext = useContext(HeaderContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthContext.Provider");
  }

  const { n } = useParams();
  const integerN = Number(n);

  return (
    <div className="main">
      <Header fixed="pos-fixed" />
      {integerN > 0 && integerN < MAX_PAGE_NUMBER ? (
        <>
          <Slider />
          <Items />
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
