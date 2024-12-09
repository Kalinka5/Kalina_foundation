import React, { useState } from "react";

import Slider from "../components/Home/Slider/Slider.tsx";
import Items from "../components/Home/Items/Items.tsx";
import Donators from "../components/Home/Donators/Donators.tsx";
import Footer from "../components/Footer.js";
import Header from "../components/Header.tsx";

import { MAX_PAGE_NUMBER } from "../lib/constants.js";

import useOrientation from "../lib/useOrientation.js";

import { useTranslation } from "react-i18next";

import NotFound from "./NotFound.js";

function Home() {
  const [page, setPage] = useState(1);
  const orientation = useOrientation();

  const { t } = useTranslation();

  const SectionLinks = [
    { id: 1, urlLink: "#slider-section", urlName: t("about-us") },
    { id: 2, urlLink: "#items-section", urlName: t("donate") },
    { id: 3, urlLink: "#donators-section", urlName: t("top-donators") },
  ];

  return (
    <div className="main">
      <Header fixed="pos-fixed">
        {orientation.isLandscape && SectionLinks}
      </Header>
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
