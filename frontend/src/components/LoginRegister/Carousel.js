import React, { useState, useEffect, useRef } from "react";

import image1 from "../../img/carousel-img1.jpg";
import image2 from "../../img/carousel-img2.jpg";
import image3 from "../../img/carousel-img3.jpg";
import image4 from "../../img/carousel-img4.jpg";

import "../../styles/loginRegister/carousel.css";

const Carousel = () => {
  const [slide, setSlide] = useState(0);
  const slides = [image1, image2, image3, image4];
  const timerRef = useRef(null); // Use a ref for the timer

  useEffect(() => {
    startAutoSlide(); // Start the timer initially

    return () => {
      if (timerRef.current) clearInterval(timerRef.current); // Cleanup on unmount
    };
  }, []);

  const changeSlide = (index) => {
    const totalSlides = slides.length;

    if (index >= totalSlides) {
      setSlide(0);
    } else if (index < 0) {
      setSlide(totalSlides - 1);
    } else {
      setSlide(index);
    }
  };

  const startAutoSlide = () => {
    if (timerRef.current) clearInterval(timerRef.current); // Clear existing timer

    timerRef.current = setInterval(() => {
      setSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000); // Change slide every 4 seconds
  };

  const resetAutoSlide = () => {
    startAutoSlide();
  };

  const nextSlide = (n) => {
    setSlide((prevSlide) => {
      const newSlide = (prevSlide + n + slides.length) % slides.length;
      return newSlide;
    });
    resetAutoSlide(); // Reset the timer on manual interaction
  };

  const handleIndicatorClick = (idx) => {
    changeSlide(idx);
    resetAutoSlide(); // Reset the timer on manual interaction
  };

  return (
    <div className="carousel-container">
      <div
        onClick={() => nextSlide(-1)}
        className="arrow-background arrow-left"
      >
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
      <div
        onClick={() => nextSlide(1)}
        className="arrow-background arrow-right"
      >
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
