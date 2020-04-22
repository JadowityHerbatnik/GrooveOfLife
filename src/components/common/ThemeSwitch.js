import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "@common/Layout";

const ThemeButton = styled.button`
  background-color: ${({ colors }) => colors.opposite};
  margin: 5px;
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
      title="change theme"
      aria-label="change theme"
      colors={colors}
      onClick={() => switchTheme()}
    ></ThemeButton>
  );
};
