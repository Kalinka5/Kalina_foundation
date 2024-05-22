import { useParams } from "react-router-dom";
import "../css/slider.css";
import { useEffect, useState } from "react";

function Slider(props) {
  const { n } = useParams();
  const images = props.images;
  const integerN = Number(n) - 1;

  const [image, setImage] = useState("");
  const [alt, setAlt] = useState("");
  const [hrefPrev, setHrefPrev] = useState("");
  const [hrefNext, setHrefNext] = useState("");

  useEffect(() => {
    setImage(images[integerN].src);
    setAlt(images[integerN].alt);
    setHrefPrev(images[integerN].hrefPrev);
    setHrefNext(images[integerN].hrefNext);
  }, []);

  return (
    <div className="slider">
      <div className="slide">
        <img src={image} alt={alt} />
        <a className="prev" href={hrefPrev}>
          prev
        </a>
        <a className="next" href={hrefNext}>
          next
        </a>
      </div>
    </div>
  );
}

export default Slider;
