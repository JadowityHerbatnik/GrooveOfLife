import React, { useState, useContext } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Slide1, Slide2, Slide3 } from "@tutorial/Slides";
import styled from "styled-components";
import { ThemeContext } from "@common/Layout";

const StyledCarousel = styled(Carousel)`
  width: 80vw;
  height: 50vh;
  .carousel-inner,
  .carousel-item {
    height: 100%;
  }
  .carousel-indicators > li {
    height: 5px;
    background-color: ${({ colors }) => colors.grey};
    &.active {
      background-color: ${({ colors }) => colors.border};
    }
  }
`;
export const CarouselTutorial = () => {
  const [index, setIndex] = useState(0);
  const colors = useContext(ThemeContext);

  const handleSelect = (selectedIndex, _e) => {
    setIndex(selectedIndex);
  };
  return (
    <StyledCarousel
      colors={colors}
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
    </StyledCarousel>
  );
};
