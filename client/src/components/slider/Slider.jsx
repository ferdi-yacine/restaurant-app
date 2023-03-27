import "./slider.css";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import pizzafeatured1 from "../../public/img/pizzafeatured1.png";
import pizzafeatured2 from "../../public/img/pizzafeatured2.png";
import pizzafeatured3 from "../../public/img/pizzafeatured3.png";
import { useState } from "react";

export const Slider = () => {
  const [index, setIndex] = useState(0);

  const handleArrow = (direction) => {
    if (direction === "left") {
      setIndex(index !== 0 ? index - 1 : 2);
    }

    if (direction === "right") {
      setIndex(index !== 2 ? index + 1 : 0);
    }
  };

  const images = [
    { img: pizzafeatured1 },
    { img: pizzafeatured2 },
    { img: pizzafeatured3 },
  ];

  return (
    <div className="sliderContainer" id="featured">
      <div className="arrowContainer" onClick={() => handleArrow("left")}>
        <ArrowBackIos className="arrow arrowLeft" />
      </div>
      <div
        className="sliderWrapper"
        style={{ transform: `translateX(${-100 * index}vw)` }}
      >
        {images.map((image, i) => (
          <div className="imgSliderContainer" key={i}>
            <img className="sliderImg" src={image.img} alt="featuredpizza" />
          </div>
        ))}
      </div>
      <div className="arrowContainer" onClick={() => handleArrow("right")}>
        <ArrowForwardIos className="arrow arrowRight" />
      </div>
    </div>
  );
};
