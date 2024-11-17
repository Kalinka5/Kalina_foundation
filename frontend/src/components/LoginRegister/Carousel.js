import React, { useState, useEffect } from "react";

import image1 from "../../img/carousel-img1.jpg";
import image2 from "../../img/carousel-img2.jpg";
import image3 from "../../img/carousel-img3.jpg";
import image4 from "../../img/carousel-img4.jpg";

import "../../styles/carousel.css";

const Carousel = () => {
  const [slide, setSlide] = useState(0);
  const slides = [image1, image2, image3, image4];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [slides.length]);

  const handleIndicatorClick = (idx) => {
    setSlide(idx);
  };

  const nextSlide = () => {
    setSlide(slide === slides.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? slides.length - 1 : slide - 1);
  };

  return (
    <div className="carousel-container">
      <div onClick={prevSlide} className="arrow-background arrow-left">
        <span className="arrow"></span>
      </div>
      <div
        className="carousel"
        style={{
          transform: `translateX(-${slide * (100 / slides.length)}%)`,
          transition: "transform 0.5s ease-in-out",
        }}
      >
        {slides.map((src, idx) => (
          <div key={idx} className="carousel-slide">
            <img src={src} alt={`Slide ${idx + 1}`} />
          </div>
        ))}
      </div>
      <div onClick={nextSlide} className="arrow-background arrow-right">
        <span className="arrow"></span>
      </div>
      <span className="indicators">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={
              slide === idx ? "indicator indicator-active" : "indicator"
            }
            onClick={() => handleIndicatorClick(idx)}
          ></button>
        ))}
      </span>
    </div>
  );
};

export default Carousel;
