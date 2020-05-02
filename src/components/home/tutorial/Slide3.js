import React, { useContext } from "react";
import styled from "styled-components";
import { ScalableText } from "@common/Generic";
import { ThemeSwitchBtn } from "@common/ThemeSwitch";
import { ThemeContext } from "@common/Layout";
import { DispatchContext } from "@home/Game";
import { SHOW_TUTORIAL } from "@reducer/action-types";

const StyledButton = styled.button`
  &::after {
    box-shadow: ${({ colors }) => `inset -4px -4px ${colors.brblack} !important`};
  }
  background-color: ${({ colors }) => `${colors.background} !important`};
  color: ${({ colors }) => `${colors.border} !important`};
  &:hover {
    background-color: ${({ colors }) => `${colors.brblack} !important`};
  }
`;
export const Slide3 = () => {
  const dispatch = useContext(DispatchContext);
  const colors = useContext(ThemeContext);
  return (
    <div className="d-flex flex-column h-100 align-items-center justify-content-center">
      <ScalableText min={10} max={15}>
        You can change the color theme by clicking the button below or in the top left corner
        <br />
        <br />
        <ThemeSwitchBtn />
        <br />
        <br />
        <StyledButton
          colors={colors}
          type="button"
          className="nes-btn"
          onClick={() => dispatch({ type: SHOW_TUTORIAL })}
        >
          Okay, got it
        </StyledButton>
      </ScalableText>
    </div>
  );
};
