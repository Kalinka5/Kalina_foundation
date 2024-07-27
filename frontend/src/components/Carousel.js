import React, { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

import loginImg1 from "../img/login-img1.jpg";
import loginImg2 from "../img/login-img2.jpg";
import loginImg3 from "../img/login-img3.jpg";
import loginImg4 from "../img/login-img4.jpg";

import "../styles/carousel.css";

export const Carousel = () => {
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      src: loginImg1,
      alt: "Image 1 for carousel",
    },
    {
      src: loginImg2,
      alt: "Image 2 for carousel",
    },
    {
      src: loginImg3,
      alt: "Image 3 for carousel",
    },
    {
      src: loginImg4,
      alt: "Image 4 for carousel",
    },
  ];

  const nextSlide = () => {
    setSlide(slide === slides.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? slides.length - 1 : slide - 1);
  };

  return (
    <div className="carousel">
      <BsArrowLeftCircleFill onClick={prevSlide} className="arrow arrow-left" />
      {slides.map((item, idx) => {
        return (
          <img
            src={item.src}
            alt={item.alt}
            key={idx}
            className={slide === idx ? "slide" : "slide slide-hidden"}
          />
        );
      })}
      <BsArrowRightCircleFill
        onClick={nextSlide}
        className="arrow arrow-right"
      />
      <span className="indicators">
        {slides.map((_, idx) => {
          return (
            <button
              key={idx}
              className={
                slide === idx ? "indicator" : "indicator indicator-inactive"
              }
              onClick={() => setSlide(idx)}
            ></button>
          );
        })}
      </span>
    </div>
  );
};
