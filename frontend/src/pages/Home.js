import React from "react";
import { useParams } from "react-router-dom";

import Slider from "../components/Slider";
import Items from "../components/Items";
import Donators from "../components/Donators";
import Footer from "../components/Footer";

import NotFound from "./NotFound";

function Home(props) {
  const { n } = useParams();
  const integerN = Number(n);

  return (
    <div className="main">
      {integerN > 0 && integerN < 6 ? (
        <div>
          <Slider page={n} images={props.images} />
          <Items page={n} />
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
