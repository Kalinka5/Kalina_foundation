import React from "react";
import { useParams } from "react-router-dom";

import Slider from "../components/Slider";
import Items from "../components/Items";
import Donaters from "../components/Donaters";

function Main(props) {
  const { n } = useParams();

  return (
    <div className="main">
      <Slider page={n} images={props.images} />
      <Items page={n} />
      <Donaters />
    </div>
  );
}

export default Main;
