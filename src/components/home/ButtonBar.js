import React, { useContext } from "react";
import styled from "styled-components";
import "@styles/fontello/css/fontello.css";
import { WrapperButton, StyledIcon, StyledLink } from "@common/Generic.js";
import { ThemeContext } from "@common/Layout.js";
import { music } from "@utils/constants.js";
import { SlideFromLeft } from "@styles/animations.js";
import { DispatchContext, StateContext } from "@home/Game";
import { Settings, Play, Pause, Note, Random, Clear, Help } from "@styles/svg/Buttons";
import {
  TOGGLE_PLAY,
  CLEAR_BOARD,
  RANDOM_BOARD,
  MUTE_SOUND,
  SET_SPEED,
  TOGGLE_SETTINGS,
} from "@reducer/action-types";

const { minSpeed, maxSpeed } = music;
const ButtonWrapper = styled.div`
  border-width: 1px 0 0 1px;
  border-style: solid;
  border-color: ${({ colors }) => colors.brblack};
  box-shadow: 2px 2px 0px black;
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media screen and (orientation: landscape) {
    flex-direction: column;
    margin-right: 10px;
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
      box-shadow: -2px 2px 0 black;
    }
    width: 50vmin;
    appearance: none;
    background: ${({ colors }) => colors.brblack};
    outline: none;
    box-shadow: 2px 2px 0 black;
    &::-webkit-slider-thumb {
      transition: 0.3s;
      webkit-appearance: none;
      appearance: none;
      width: 4vh;
      height: 2vh;
      background: ${({ colors }) => colors.border};
      border: none;
    }
  }
`;
const SvgIcon = styled.div`
  width: 4vh;
  height: 4vh;
  margin: 1vh;
  background-color: ${({ color }) => color};
  mask: ${({ svg }) => `url(${svg}) no-repeat center /contain`};
`;
const Buttons = () => {
  const colors = useContext(ThemeContext);
  const dispatch = useContext(DispatchContext);
  const { mute, speed, isPlaying } = useContext(StateContext);
  return (
    <Container>
      <ButtonWrapper colors={colors}>
        <WrapperButton onClick={() => dispatch({ type: "togglePlaying" })}>
          {/* <StyledIcon color={green} className={isPlaying ? "icon-pause" : "icon-play"} /> */}
          <SvgIcon color={colors.green} svg={isPlaying ? Pause : Play} />
        </WrapperButton>
        <WrapperButton onClick={() => dispatch({ type: "randomize" })}>
          <SvgIcon color={colors.border} svg={Random} />
          {/* <StyledIcon color={yellow} className="icon-shuffle" /> */}
        </WrapperButton>
        <WrapperButton onClick={() => dispatch({ type: "clear" })}>
          <SvgIcon color={colors.red} svg={Clear} />
          {/* <StyledIcon color={red} className="icon-cancel" /> */}
        </WrapperButton>
        <WrapperButton onClick={() => dispatch({ type: "mute" })}>
          <SvgIcon color={colors.blue} svg={Note} />
          {/* <StyledIcon color={blue} className={mute ? "icon-volume-off" : "icon-volume-up"} /> */}
        </WrapperButton>
        <WrapperButton onClick={() => dispatch({ type: "toggleSettings" })}>
          <SvgIcon color={colors.grey} svg={Settings} />
          {/* <StyledIcon color={grey} className="icon-cog" /> */}
        </WrapperButton>
        <StyledLink
          colors={colors}
          cover
          direction="up"
          bg={colors.background}
          duration={1.5}
          to="/about"
        >
          <SvgIcon color={colors.violet} svg={Help} />
          {/* <StyledIcon color={violet} className="icon-help" /> */}
        </StyledLink>
      </ButtonWrapper>
      <SliderWrapper colors={colors}>
        <input
          className="slider"
          type="range"
          min={minSpeed}
          max={maxSpeed}
          step="1"
          value={speed}
          onChange={(event) => dispatch({ type: SET_SPEED, payload: parseInt(event.target.value) })}
        />
      </SliderWrapper>
    </Container>
  );
};
export default Buttons;
