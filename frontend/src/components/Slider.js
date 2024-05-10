import React from "react";
import "../css/slider.css";

import bpla from "../img/bpla.jpg";
import communication from "../img/communication.jpg";
import drones from "../img/drones.jpg";
import optical_devices from "../img/optical_devices.jpg";
import transport from "../img/transport.jpg";
import warriors from "../img/warriors.png";

class Slider extends React.Component {
  render() {
    return (
      <div class="slider">
        <ul>
          <li id="no-js-slider-1" class="slide">
            <img src={bpla} alt="BPLA" />
            <a class="prev" href="#no-js-slider-6">
              prev
            </a>
            <a class="next" href="#no-js-slider-2">
              next
            </a>
          </li>
          <li id="no-js-slider-2" class="slide">
            <img src={communication} alt="Communication" />
            <a class="prev" href="#no-js-slider-1">
              prev
            </a>
            <a class="next" href="#no-js-slider-3">
              next
            </a>
          </li>
          <li id="no-js-slider-3" class="slide">
            <img src={drones} alt="Drones" />
            <a class="prev" href="#no-js-slider-2">
              prev
            </a>
            <a class="next" href="#no-js-slider-4">
              next
            </a>
          </li>
          <li id="no-js-slider-4" class="slide">
            <img src={optical_devices} alt="Optical devices" />
            <a class="prev" href="#no-js-slider-3">
              prev
            </a>
            <a class="next" href="#no-js-slider-5">
              next
            </a>
          </li>
          <li id="no-js-slider-5" class="slide">
            <img src={transport} alt="Transport" />
            <a class="prev" href="#no-js-slider-4">
              prev
            </a>
            <a class="next" href="#no-js-slider-6">
              next
            </a>
          </li>
          <li id="no-js-slider-6" class="slide">
            <img src={warriors} alt="Warriors" />
            <a class="prev" href="#no-js-slider-5">
              prev
            </a>
            <a class="next" href="#no-js-slider-1">
              next
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Slider;
