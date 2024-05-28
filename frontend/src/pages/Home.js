import React from "react";
import { useParams } from "react-router-dom";

import Slider from "../components/Slider";
import Items from "../components/Items";
import Donaters from "../components/Donaters";
import Footer from "../components/Footer";

function Home(props) {
  const { n } = useParams();

  return (
    <div className="main">
      <Slider page={n} images={props.images} />
      <Items page={n} />
      <Donaters />
      <Footer back="dot-white" />
    </div>
  );
}

export default Home;
