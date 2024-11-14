import React from "react";
import { useParams } from "react-router-dom";

import Slider from "../components/Slider";
import Items from "../components/Items";
import Donators from "../components/Donators";
import Footer from "../components/Footer";
import Header from "../components/Header";

import { MAX_PAGE_NUMBER } from "../constants";

import NotFound from "./NotFound";

function Home(props) {
  const { n } = useParams();
  const integerN = Number(n);

  return (
    <div className="main">
      <Header links={props.links} fixed={true} />
      {integerN > 0 && integerN < MAX_PAGE_NUMBER ? (
        <div>
          <Slider page={n} />
          <Items page={n} superUser={props.isAuth} />
          <Donators />
          <Footer back="dot-white" />
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
}

export default Home;
