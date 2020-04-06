import React, { useContext } from "react";
import styled from "styled-components";
import "@styles/fontello/css/fontello.css";
import { WrapperButton, StyledIcon, StyledLink } from "@common/Generic.js";
import { ThemeContext } from "@common/Layout.js";
import { music } from "@utils/constants.js";
import { SlideFromLeft } from "@styles/animations.js";

const { minSpeed, maxSpeed } = music;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media screen and (orientation: landscape) {
    flex-direction: column;
  }
`;
// const RightButtonWrapper = styled(LeftButtonWrapper)`
// @media screen and (orientation: landscape) {
//   position: absolute;
//   top: 50%;
//   right: 0;
// }
// `;
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
    opacity: 0.5;
    width: 50vmin;
    appearance: none;
    background: black;
    outline: none;
    transition: opacity 0.5s;
    &:hover {
      opacity: 0.7;
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
  const colors = useContext(ThemeContext);
  const { violet, orange, white, black, grey, green, red, yellow, blue, pink } = colors;
  return (
    <Container>
      <ButtonWrapper>
        <WrapperButton onClick={() => props.togglePlaying()}>
          <StyledIcon color={green} className={props.isGameRunning ? "icon-pause" : "icon-play"} />
        </WrapperButton>
        <WrapperButton onClick={() => props.changeBoardState("randomize")}>
          <StyledIcon color={yellow} className="icon-shuffle" />
        </WrapperButton>
        <WrapperButton onClick={() => props.changeBoardState("clear")}>
          <StyledIcon color={red} className="icon-cancel" />
        </WrapperButton>
        <WrapperButton onClick={() => props.toggleMute()}>
          <StyledIcon color={blue} className={props.mute ? "icon-volume-off" : "icon-volume-up"} />
        </WrapperButton>
        <WrapperButton onClick={() => props.toggleSettings()}>
          <StyledIcon color={grey} className="icon-cog" />
        </WrapperButton>
        <WrapperButton>
          <StyledLink colors={colors} cover direction="up" bg={black} duration={1.5} to="/about">
            <StyledIcon color={violet} className="icon-help" />
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
