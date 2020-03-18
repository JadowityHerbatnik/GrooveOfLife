import React from "react";
import styled from "styled-components";
import "../styles/fontello/css/fontello.css";
import { StyledIcon, StyledLink } from "../components/Generic.js";

const Button = styled.button`
  background-color: transparent;
  padding: 0;
  border: none;
  color: white;
  outline: none;
  transition: 0.5s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  @media screen and (orientation: landscape) {
    flex-direction: column;
  }
`;
const Container = styled.div`
  @keyframes slidefromleft {
    0% {
      transform: translateX(-100vw);
    }
    100% {
      transform: translateX(1);
    }
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (orientation: landscape) {
    flex-direction: row;
  }
  animation: 0.5s ease 1 both slidefromleft;
  }
`;
const SliderWrapper = styled.div`
  position: relative;
  // display: inline-block;
  height: 2vh;
  width: 50vmin;
	margin: 2vh 0 2vh 0;
  @media screen and (orientation: landscape) {
  width: 2vh;
  height: 50vmin;
  }
  .slider {
    position: absolute;
    left: 0;
    top: 0;
  @media screen and (orientation: landscape) {
    transform: translateY(50vmin) rotate(-90deg);
    transform-origin: top left;
  }
    opacity: 0.3;
    width: 50vmin;
    appearance: none;
    background: black;
    outline: none;
    transition: opacity 0.5s;
    &:hover {
      opacity: 0.5;
    }
    &::-webkit-slider-thumb {
      transition: 0.3s;
      webkit-appearance: none;
      appearance: none;
      width: 5vh;
      height: 2vh;
      background: white;
      border-radius: 3px;
      border: none;
    }
`;
const Buttons = props => {
  return (
    <Container>
      <ButtonWrapper>
        <Button onClick={() => props.changeBoardState("randomize")}>
          <StyledIcon className="icon-shuffle" />
        </Button>
        <Button onClick={() => props.changeBoardState("clear")}>
          <StyledIcon className="icon-cancel" />
        </Button>
        <Button onClick={() => props.toggle("play")}>
          <StyledIcon className={props.isGameRunning ? "icon-pause" : "icon-play"} />
        </Button>
        <br />
        <Button onClick={() => props.toggle("mute")}>
          <StyledIcon className={props.mute ? "icon-volume-off" : "icon-volume-up"} />
        </Button>
        <Button onClick={() => props.toggle("settings")}>
          <StyledIcon className="icon-cog" />
        </Button>
        <StyledLink
          cover
          direction="up"
          bg="linear-gradient(to right, #1f498c, #1CB5E0)"
          duration={1.5}
          to="/about"
        >
          <StyledIcon className="icon-help" />
        </StyledLink>
      </ButtonWrapper>
      <SliderWrapper>
        <input
          className="slider"
          type="range"
          min={props.minSpeed}
          max={props.maxSpeed}
          step="1"
          value={props.speed}
          onChange={event => props.sliderChange(event)}
        />
      </SliderWrapper>
    </Container>
  );
};
export default Buttons;
