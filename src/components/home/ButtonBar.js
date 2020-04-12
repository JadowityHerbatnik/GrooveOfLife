import React, { useContext } from "react";
import styled from "styled-components";
import "@styles/fontello/css/fontello.css";
import { WrapperButton, StyledIcon, StyledLink } from "@common/Generic.js";
import { ThemeContext } from "@common/Layout.js";
import { music } from "@utils/constants.js";
import { SlideFromLeft } from "@styles/animations.js";
import { DispatchContext, StateContext } from "@home/Game";
// import Ikonka from "./settings.svg";
// import Play from "./play.svg";
// import Pause from "./pause.svg";
// import note from "./note.svg";
// import Random from "./random.svg";
// import Clear from "./clear.svg";
// import Help from "./help.svg";

const { minSpeed, maxSpeed } = music;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
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
const Svgik = styled.div`
  width: 4vh;
  height: 4vh;
  margin: 1vh;
  background-color: ${({ color }) => color};
  mask: ${({ svg }) => `url(${svg}) no-repeat center /contain`};
  fill: pink;
`;
const Buttons = () => {
  const colors = useContext(ThemeContext);
  const dispatch = useContext(DispatchContext);
  const { mute, speed, isPlaying } = useContext(StateContext);
  const { violet, background, grey, green, red, yellow, blue } = colors;
  return (
    <Container>
      <ButtonWrapper>
        <WrapperButton onClick={() => dispatch({ type: "togglePlaying" })}>
          <StyledIcon color={green} className={isPlaying ? "icon-pause" : "icon-play"} />
          {/* <Svgik color={colors.green} svg={isPlaying ? Pause : Play} /> */}
        </WrapperButton>
        <WrapperButton onClick={() => dispatch({ type: "randomize" })}>
          {/* <Svgik color={colors.yellow} svg={Random} /> */}
          <StyledIcon color={yellow} className="icon-shuffle" />
        </WrapperButton>
        <WrapperButton onClick={() => dispatch({ type: "clear" })}>
          {/* <Svgik color={colors.red} svg={Clear} /> */}
          <StyledIcon color={red} className="icon-cancel" />
        </WrapperButton>
        <WrapperButton onClick={() => dispatch({ type: "mute" })}>
          {/* <Svgik color={colors.blue} svg={note} /> */}
          <StyledIcon color={blue} className={mute ? "icon-volume-off" : "icon-volume-up"} />
        </WrapperButton>
        <WrapperButton onClick={() => dispatch({ type: "toggleSettings" })}>
          {/* <Svgik color={colors.grey} svg={Ikonka} /> */}
          <StyledIcon color={grey} className="icon-cog" />
        </WrapperButton>
        <WrapperButton>
          <StyledLink
            colors={colors}
            cover
            direction="up"
            bg={background}
            duration={1.5}
            to="/about"
          >
            {/* <Svgik color={colors.violet} svg={Help} /> */}
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
          value={speed}
          onChange={(event) => dispatch({ type: "speed", payload: parseInt(event.target.value) })}
        />
      </SliderWrapper>
    </Container>
  );
};
export default Buttons;
