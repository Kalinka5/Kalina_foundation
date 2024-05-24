import React from "react";
import { useParams } from "react-router-dom";
import "../css/slider.css";
import Slider from "./Slider";
import Items from "./Items";
import Donaters from "./Donaters";

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
