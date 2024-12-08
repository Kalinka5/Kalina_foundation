import React, { useEffect, useState, useMemo } from "react";

import { useMediaQuery } from "@uidotdev/usehooks";

import bpla from "../../../img/bpla.jpg";
import bplaMobile from "../../../img/bpla_mobile.jpeg";
import communication from "../../../img/communication.jpg";
import communicationMobile from "../../../img/communication_mobile.jpg";
import drones from "../../../img/naval_drones.jpg";
import dronesMobile from "../../../img/drones_mobile.jpg";
import opticalDevices from "../../../img/optical_devices.jpg";
import opticalDevMobile from "../../../img/optical_dev_mobile.jpg";
import transport from "../../../img/transport.jpg";
import transportMobile from "../../../img/transport_mobile.jpeg";

import ArrowButton from "./ArrowButton.tsx";
import SliderText from "./SliderText.tsx";

import useOrientation from "../../../lib/useOrientation.js";

import { SliderProps } from "../../../lib/types";

import "../../../styles/home/slider/slider.css";

function Slider({ page, setPage }: SliderProps) {
  const [imageIndex, setImageIndex] = useState<number>(page - 1);
  const [image, setImage] = useState<string>("");
  const [alt, setAlt] = useState<string>("");

  const orientation = useOrientation();
  const isMobile = useMediaQuery("only screen and (max-width: 540px)");

  // Use useMemo to memoize the images array
  const images = useMemo(
    () => [
      {
        src: isMobile ? bplaMobile : bpla,
        alt: "BPLA",
        prevIndex: 4,
        nextIndex: 1,
      },
      {
        src: isMobile ? communicationMobile : communication,
        alt: "Communication",
        prevIndex: 0,
        nextIndex: 2,
      },
      {
        src: isMobile ? dronesMobile : drones,
        alt: "Drones",
        prevIndex: 1,
        nextIndex: 3,
      },
      {
        src: isMobile ? opticalDevMobile : opticalDevices,
        alt: "Optical devices",
        prevIndex: 2,
        nextIndex: 4,
      },
      {
        src: isMobile ? transportMobile : transport,
        alt: "Transport",
        prevIndex: 3,
        nextIndex: 0,
      },
    ],
    [isMobile]
  );

  useEffect(() => {
    setImage(images[imageIndex].src);
    setAlt(images[imageIndex].alt);
  }, [imageIndex, images]);

  const handlePrev = () => {
    setImageIndex(images[imageIndex].prevIndex);
    page === 1 ? setPage(5) : setPage(page - 1);
  };

  const handleNext = () => {
    setImageIndex(images[imageIndex].nextIndex);
    page === 5 ? setPage(1) : setPage(page + 1);
  };

  return (
    <div className="slider">
      <ArrowButton className="prev" onClick={handlePrev}>
        prev
      </ArrowButton>
      <div className="slider-text-image">
        <SliderText isPortrait={orientation.isPortrait} />
        <img className="slider-image" src={image} alt={alt} />
      </div>
      <ArrowButton className="next" onClick={handleNext}>
        next
      </ArrowButton>
    </div>
  );
}

export default Slider;
