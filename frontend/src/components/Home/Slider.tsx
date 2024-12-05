import React, { useEffect, useState, useMemo } from "react";

import { useMediaQuery } from "@uidotdev/usehooks";

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

import { useTranslation } from "react-i18next";

import { SliderProps } from "../../lib/types";

import "../../styles/home/slider.css";

function Slider({ page, setPage }: SliderProps) {
  const [imageIndex, setImageIndex] = useState<number>(page - 1);
  const [image, setImage] = useState<string>("");
  const [alt, setAlt] = useState<string>("");

  const isMobile = useMediaQuery("only screen and (max-width: 540px)");

  const { t } = useTranslation();

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
      <div className="slider-text-image">
        <div className="text-description">
          <div className="text-container text-center mg-100">
            <div className="text-logo-container">
              <h1 className="logo-text">
                <span>Kalina</span>&nbsp;
                <span>Foundataion</span>
              </h1>
              <p className="logo-slogan">{t("slider-slogan")}</p>
            </div>
          </div>
          <div className="text-container mg-70 text-columns">
            <div className="about-container">
              <h2 className="text-title">{t("slider-header-1")}</h2>
              <p className="text">{t("slider-text-1")}</p>
            </div>
            <div className="about-container right">
              <h2 className="text-title">{t("slider-header-2")}</h2>
              <p className="text">{t("slider-text-2")}</p>
            </div>
          </div>
          <div className="text-container mg-150 text-columns">
            <div className="about-container">
              <h2 className="text-title">{t("slider-header-3")}</h2>
              <p className="text list">{t("slider-text-3")}</p>
              <ul className="list-items bullets">
                <li>{t("donate-items-1")}</li>
                <li>{t("donate-items-2")}</li>
                <li>{t("donate-items-3")}</li>
                <li>{t("donate-items-4")}</li>
              </ul>
            </div>
            <div className="about-container right">
              <h2 className="text-title">{t("slider-header-4")}</h2>
              <p className="text list">{t("slider-text-4")}</p>
              <div className="container-list">
                <ul className="list-items bags">
                  <li>{t("donate-methods-1")}</li>
                  <li>{t("donate-methods-2")}</li>
                  <li>{t("donate-methods-3")}</li>
                  <li>{t("donate-methods-4")}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="text-container text-center">
            <h2 className="text-title">{t("slider-header-5")}</h2>
            <p className="text">
              {t("slider-text-5")}&nbsp;
              <span>
                <a href="/donate" target="_blank">
                  {t("slider-text-link")}
                </a>
              </span>
            </p>
          </div>
        </div>
        <img className="slider-image" src={image} alt={alt} />
      </div>
      <button className="prev" onClick={handlePrev}>
        prev
      </button>
      <button className="next" onClick={handleNext}>
        next
      </button>
    </div>
  );
}

export default Slider;
