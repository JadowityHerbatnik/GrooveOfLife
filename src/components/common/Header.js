import PropTypes from "prop-types";
import React, { forwardRef, useContext } from "react";
import styled, { css } from "styled-components";
import { StyledLink } from "@common/Generic.js";
import { FadeIn } from "@styles/animations.js";
import { ThemeContext } from "@common/Layout";

const Wrapper = styled.header`
  position: relative;
  animation: ${() => css`2s ease 1s 1 both ${FadeIn}`};
  border-width: 0px 0px 3px 0px;
  border-color: ${({ colors }) => colors.border};
  border-style: solid;
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const H1 = styled.h1`
  font-weight: bold;
  margin: 0.6em 0 0.4em 0;
  font-size: 40px;
  @media (min-width: 300px) and (max-width: 960px) {
    font-size: calc(40px + 10 * (100vw - 300px) / (960 - 300));
  }
  @media (min-width: 960px) {
    margin: 0.4em 0 0.4em 0;
    font-size: 50px;
  }
  font-family: "Geo";
  text-shadow: 4px 4px 0px rgba(0, 0, 0, 0.75);
`;

const Header = forwardRef(({ siteTitle }, ref) => {
  const colors = useContext(ThemeContext);
  return (
    <Wrapper ref={ref} colors={colors}>
      <H1 colors={colors}>
        <StyledLink
          title="home"
          color={colors.header}
          cover
          bg={colors.background}
          direction="right"
          duration={1}
          to="/"
        >
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
