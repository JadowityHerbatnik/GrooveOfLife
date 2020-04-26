import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Slide1, Slide2, Slide3 } from "@tutorial/Slides";

export const CarouselTutorial = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, _e) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel
      style={{ width: "80vw", height: "50vh" }}
      wrap={false}
      interval={null}
      activeIndex={index}
      onSelect={handleSelect}
    >
      <Carousel.Item>
        <Slide1 />
      </Carousel.Item>
      <Carousel.Item>
        <Slide2 />
      </Carousel.Item>
      <Carousel.Item>
        <Slide3 />
      </Carousel.Item>
    </Carousel>
  );
};
