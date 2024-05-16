// import { useParams } from "react-router-dom";
import "../css/slider.css";

import bpla from "../img/bpla.jpg";
import communication from "../img/communication.jpg";
import drones from "../img/drones.jpg";
import optical_devices from "../img/optical_devices.jpg";
import transport from "../img/transport.jpg";
import warriors from "../img/warriors.png";

function Slider() {
  // const { n } = useParams();

  return (
    <div className="slider">
      <ul>
        <li id="/1" className="slide">
          <img src={bpla} alt="BPLA" />
          <a className="prev" href="/6">
            prev
          </a>
          <a className="next" href="/2">
            next
          </a>
        </li>
        <li id="/2" className="slide">
          <img src={communication} alt="Communication" />
          <a className="prev" href="/1">
            prev
          </a>
          <a className="next" href="/3">
            next
          </a>
        </li>
        <li id="/3" className="slide">
          <img src={drones} alt="Drones" />
          <a className="prev" href="/2">
            prev
          </a>
          <a className="next" href="/4">
            next
          </a>
        </li>
        <li id="/4" className="slide">
          <img src={optical_devices} alt="Optical devices" />
          <a className="prev" href="/3">
            prev
          </a>
          <a className="next" href="/5">
            next
          </a>
        </li>
        <li id="/5" className="slide">
          <img src={transport} alt="Transport" />
          <a className="prev" href="/4">
            prev
          </a>
          <a className="next" href="/6">
            next
          </a>
        </li>
        <li id="/6" className="slide">
          <img src={warriors} alt="Warriors" />
          <a className="prev" href="/5">
            prev
          </a>
          <a className="next" href="/1">
            next
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Slider;
