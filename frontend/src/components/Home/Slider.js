import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useMediaQuery } from "@uidotdev/usehooks";

import { HOME_PAGE } from "../../constants";

import bpla from "../../img/bpla.jpg";
import bplaMobile from "../../img/bpla_mobile.jpeg";
import communication from "../../img/communication.jpg";
import communicationMobile from "../../img/communication_mobile.jpg";
import drones from "../../img/naval_drones.jpg";
import dronesMobile from "../../img/drones_mobile.jpg";
import opticalDevices from "../../img/optical_devices.jpg";
import opticalDevMobile from "../../img/optical_dev_mobile.jpg";
import transport from "../../img/transport.jpg";
import transportMobile from "../../img/transport_mobile.jpeg";

import "../../styles/home/slider.css";

function Slider() {
  const { n } = useParams();
  const integerN = Number(n) - 1;

  const [image, setImage] = useState("");
  const [alt, setAlt] = useState("");
  const [hrefPrev, setHrefPrev] = useState("");
  const [hrefNext, setHrefNext] = useState("");

  const isMobile = useMediaQuery("only screen and (max-width: 540px)");
  const images = [
    {
      src: isMobile ? bplaMobile : bpla,
      alt: "BPLA",
      hrefPrev: `${HOME_PAGE}/5`,
      hrefNext: `${HOME_PAGE}/2`,
    },
    {
      src: isMobile ? communicationMobile : communication,
      alt: "Communication",
      hrefPrev: `${HOME_PAGE}/1`,
      hrefNext: `${HOME_PAGE}/3`,
    },
    {
      src: isMobile ? dronesMobile : drones,
      alt: "Drones",
      hrefPrev: `${HOME_PAGE}/2`,
      hrefNext: `${HOME_PAGE}/4`,
    },
    {
      src: isMobile ? opticalDevMobile : opticalDevices,
      alt: "Optical devices",
      hrefPrev: `${HOME_PAGE}/3`,
      hrefNext: `${HOME_PAGE}/5`,
    },
    {
      src: isMobile ? transportMobile : transport,
      alt: "Transport",
      hrefPrev: `${HOME_PAGE}/4`,
      hrefNext: `${HOME_PAGE}/1`,
    },
  ];

  useEffect(() => {
    setImage(images[integerN].src);
    setAlt(images[integerN].alt);
    setHrefPrev(images[integerN].hrefPrev);
    setHrefNext(images[integerN].hrefNext);
  }, []);

  return (
    <div className="slider">
      <img src={image} alt={alt} />
      <a className="prev" href={hrefPrev}>
        prev
      </a>
      <a className="next" href={hrefNext}>
        next
      </a>
    </div>
  );
}

export default Slider;
