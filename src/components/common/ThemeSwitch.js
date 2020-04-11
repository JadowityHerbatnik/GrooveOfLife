import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "@common/Layout";

const ThemeButton = styled.button`
  background-color: ${({ colors }) => colors.opposite};
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  border: none;
  outline: none;
  cursor: pointer;
`;
export const ThemeSwitch = ({ switchTheme }) => {
  const colors = useContext(ThemeContext);
  return (
    <ThemeButton
      aria-label="switch theme"
      colors={colors}
      onClick={() => switchTheme()}
    ></ThemeButton>
  );
};
