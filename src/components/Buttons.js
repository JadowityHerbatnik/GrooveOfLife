import React from "react";
import styled from "styled-components";
import "../styles/fontello/css/fontello.css";
import { WrapperButton, StyledIcon, StyledLink } from "../components/Generic.js";
import { music } from "../utils/constants.js";
import { SlideFromLeft } from "../styles/animations.js";
const { minSpeed, maxSpeed } = music;

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
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (orientation: landscape) {
    flex-direction: row;
  }
  animation: 0.5s ease 1 both ${SlideFromLeft};
  }
`;
const SliderWrapper = styled.div`
  position: relative;
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
  }
`;
const Buttons = (props) => {
  return (
    <Container>
      <ButtonWrapper>
        <WrapperButton onClick={() => props.changeBoardState("randomize")}>
          <StyledIcon className="icon-shuffle" />
        </WrapperButton>
        <WrapperButton onClick={() => props.changeBoardState("clear")}>
          <StyledIcon className="icon-cancel" />
        </WrapperButton>
        <WrapperButton onClick={() => props.togglePlaying()}>
          <StyledIcon className={props.isGameRunning ? "icon-pause" : "icon-play"} />
        </WrapperButton>
        <br />
        <WrapperButton onClick={() => props.toggleMute()}>
          <StyledIcon className={props.mute ? "icon-volume-off" : "icon-volume-up"} />
        </WrapperButton>
        <WrapperButton onClick={() => props.toggleSettings()}>
          <StyledIcon className="icon-cog" />
        </WrapperButton>
        <WrapperButton>
          <StyledLink
            cover
            direction="up"
            bg="linear-gradient(90deg, rgba(9,38,182,1) 0%, rgba(106,12,238,1) 100%)"
            duration={1.5}
            to="/about"
          >
            <StyledIcon className="icon-help" />
          </StyledLink>
        </WrapperButton>
      </ButtonWrapper>
      <SliderWrapper>
        <input
          className="slider"
          type="range"
          min={minSpeed}
          max={maxSpeed}
          step="1"
          value={props.speed}
          onChange={(event) => props.sliderChange(event)}
        />
      </SliderWrapper>
    </Container>
  );
};
export default Buttons;
