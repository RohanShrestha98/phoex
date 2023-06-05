import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";

export default function HomeSlider(props) {
  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      sliderRef.current.slickNext();
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <Slider className="homeSlider" {...settings} ref={sliderRef}>
      {props.data &&
        props.data.map((items) => (
          <div className="slider">
            <img src={items.img} alt="" />
          </div>
        ))}

      {props.loading && (
        <div className="loader">
          <img src="img/loader.gif" alt="" />
        </div>
      )}
    </Slider>
  );
}
