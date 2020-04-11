import React from "react";
import styled from "styled-components";
import { solarized, gruvbox } from "@utils/constants";
const ThemeButton = styled.button`
  background-color: ${({ theme }) =>
    theme === "solarized" ? gruvbox.background : solarized.background};
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  border: none;
  outline: none;
  cursor: pointer;
`;
export const ThemeSwitch = ({ theme, switchTheme }) => {
  return (
    <ThemeButton
      aria-label="switch theme"
      theme={theme}
      onClick={() => switchTheme()}
    ></ThemeButton>
  );
};
