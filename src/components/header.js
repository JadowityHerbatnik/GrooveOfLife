import PropTypes from "prop-types";
import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { StyledLink, WrapperButton } from "../components/Generic.js";
import { ThemeContext } from "../components/layout.js";
import { FadeIn } from "../styles/animations.js";

const Wrapper = styled.header`
  animation: ${({ animateHeader }) =>
    animateHeader ? () => css`2s ease 1s 1 both ${FadeIn}` : "none"};
  // background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), transparent);
  backdrop-filter: blur(30px);
  border-width: 0px 0px 3px 0px;
  border-color: ${({ colors }) => colors.border};
  border-style: solid;
  text-align: center;
  height: 15vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const H1 = styled.h1`
  margin: 0;
  font-size: 7vh;
  font-family: "Geo";
`;
const ThemeButton = styled(WrapperButton)`
  position: fixed;
  top: 10px;
  right: 10px;
`;

const Header = ({ siteTitle, animateHeader, setTheme }) => {
  const colors = useContext(ThemeContext);

  return (
    <Wrapper colors={colors} animateHeader={animateHeader}>
      <ThemeButton onClick={() => setTheme()}>theme</ThemeButton>
      <H1>
        <StyledLink
          colors={colors}
          cover
          bg={colors.black}
          direction="up"
          duration={1}
          to="/"
        >
          {siteTitle}
        </StyledLink>
      </H1>
    </Wrapper>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
