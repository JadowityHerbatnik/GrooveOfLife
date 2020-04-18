import React, { useContext } from "react";
import styled from "styled-components";
import { music } from "@utils/constants.js";
import { SET_SPEED } from "@reducer/action-types";
import { DispatchContext, StateContext } from "@home/Game";
import { ThemeContext } from "@common/Layout.js";

const { minSpeed, maxSpeed } = music;
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
export const SpeedSlider = () => {
  const colors = useContext(ThemeContext);
  const { speed } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  return (
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
  );
};
