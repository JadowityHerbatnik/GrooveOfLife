import React, { useContext } from "react";
import styled from "styled-components";
import { music } from "@utils/constants";
import { SET_SPEED } from "@reducer/action-types";
import { DispatchContext, StateContext } from "@home/Game";
import { ThemeContext } from "@common/Layout";

const { minSpeed, maxSpeed, speedStep } = music;
const SliderWrapper = styled.div`
  position: relative;
  height: 2vh;
  width: 50vmin;
  margin: 2vh 0 2vh 0;
  ${({ responsive }) =>
    responsive &&
    `@media screen and (orientation: landscape) {
    width: 2vh;
    height: 50vmin;
    transform: translateY(50vmin) rotate(-90deg);
    transform-origin: top left;
  }`}
  .slider {
    ${({ shadows }) =>
      shadows &&
      `box-shadow: 2px 2px 0 black;
    @media screen and (orientation: landscape) {
      box-shadow: -2px 2px 0 black;
    }`}
    position: absolute;
    left: 0;
    top: 0;
    width: 50vmin;
    appearance: none;
    background: ${({ colors }) => colors.brblack};
    outline: none;
    &::-webkit-slider-thumb {
      transition: 0.3s;
      webkit-appearance: none;
      appearance: none;
      width: 4vh;
      height: 2vh;
      background: ${({ colors }) => colors.border};
      border: none;
    }
    &::-moz-range-thumb {
      transition: 0.3s;
      webkit-appearance: none;
      appearance: none;
      width: 4vh;
      height: 2vh;
      background: ${({ colors }) => colors.border};
      border: none;
    }
    &::-ms-thumb {
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
export const SpeedSlider = ({ responsive, shadows }) => {
  const colors = useContext(ThemeContext);
  const { beatsPerChord } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const changeSpeed = (event) => {
    dispatch({ type: SET_SPEED, payload: parseFloat(event.target.value) });
  };

  return (
    <SliderWrapper responsive={responsive} shadows={shadows} colors={colors}>
      <input
        className="slider"
        type="range"
        min={minSpeed}
        max={maxSpeed}
        step={speedStep}
        value={beatsPerChord}
        onChange={(event) => changeSpeed(event)}
      />
    </SliderWrapper>
  );
};
