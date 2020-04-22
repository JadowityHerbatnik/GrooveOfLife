import React, { useContext } from "react";
import { StyledLink, SvgIcon } from "@common/Generic.js";
import { ThemeContext } from "@common/Layout";
import { Help } from "@styles/svg/Buttons";
import styled from "styled-components";
const StyledSvg = styled(SvgIcon)`
  width: 3vh;
  height: 3vh;
  margin: 1vh;
`;
export const AboutLink = (props) => {
  const colors = useContext(ThemeContext);
  return (
    <StyledLink
      title="about"
      colors={colors}
      cover
      direction="right"
      bg={colors.background}
      duration={1.5}
      to="/about"
    >
      <StyledSvg color={colors.violet} svg={Help} />
    </StyledLink>
  );
};
