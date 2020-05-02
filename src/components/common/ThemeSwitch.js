import React, { useContext } from "react";
import styled from "styled-components";
import { SwitchTheme, ThemeContext } from "@common/Layout";

const ThemeButton = styled.button`
  background-color: ${({ colors }) => colors.opposite};
  margin: 5px;
  width: 20px;
  height: 20px;
  border: none;
  outline: none;
  cursor: pointer;
`;
export const ThemeSwitchBtn = () => {
  const colors = useContext(ThemeContext);
  const switchTheme = useContext(SwitchTheme);
  return (
    <ThemeButton
      title="change theme"
      aria-label="change theme"
      colors={colors}
      onClick={() => switchTheme()}
    ></ThemeButton>
  );
};
