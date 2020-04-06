import PropTypes from "prop-types";
import React, { useContext, forwardRef } from "react";
import styled, { css } from "styled-components";
import { StyledLink, WrapperButton } from "@common/Generic.js";
import { ThemeContext } from "@common/Layout.js";
import { FadeIn } from "@styles/animations.js";

const Wrapper = styled.header`
  animation: ${({ animateHeader }) =>
    animateHeader ? () => css`2s ease 1s 1 both ${FadeIn}` : "none"};
  border-width: 0px 0px 3px 0px;
  border-color: ${({ colors }) => colors.border};
  border-style: solid;
  text-align: center;
  // height: 15vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const H1 = styled.h1`
  font-size: 40px;
  @media (min-width: 960px) {
    font-size: 50px;
  }
  @media (min-width: 300px) and (max-width: 960px) {
    font-size: calc(40px + 10 * (100vw - 300px) / (960 - 300));
  }
  margin: 0.4em 0 0.4em 0;
  font-family: "Geo";
  text-shadow: 6px 6px 0px rgba(0, 0, 0, 0.75);
`;
const ThemeButton = styled(WrapperButton)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const Header = forwardRef(({ siteTitle, animateHeader, setTheme }, ref) => {
  const colors = useContext(ThemeContext);

  return (
    <Wrapper ref={ref} colors={colors} animateHeader={animateHeader}>
      <ThemeButton onClick={() => setTheme()}>theme</ThemeButton>
      <H1>
        <StyledLink color={colors.grey} cover bg={colors.black} direction="up" duration={1} to="/">
          {siteTitle}
        </StyledLink>
      </H1>
    </Wrapper>
  );
});

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
