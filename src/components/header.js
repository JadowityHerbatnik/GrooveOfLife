import PropTypes from "prop-types";
import React from "react";
import styled, { css } from "styled-components";
import { StyledLink } from "../components/Generic.js";
import { FadeIn } from "../styles/animations.js";

const Wrapper = styled.header`
  animation: ${({ animateHeader }) =>
    animateHeader ? () => css`2s ease 1s 1 both ${FadeIn}` : "none"};
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), transparent);
  backdrop-filter: blur(30px);
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
const ButtonBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0;
  position: fixed;
  width: 100%;
  top: 0;
`;
const Header = ({ siteTitle, animateHeader }) => (
  <Wrapper animateHeader={animateHeader}>
    <ButtonBar></ButtonBar>
    <H1>
      <StyledLink
        cover
        bg="linear-gradient(90deg, rgba(9,38,182,1) 0%, rgba(106,12,238,1) 100%)"
        direction="up"
        duration={1}
        to="/"
      >
        {siteTitle}
      </StyledLink>
    </H1>
  </Wrapper>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
