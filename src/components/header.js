import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { sizes } from "../utils/constants.js";

const Wrapper = styled.header`
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0)
  );
  // opacity: 0.8;
  text-align: center;
  height: 15vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const H1 = styled.h1`
  margin: 0;
  font-size: 9vh;
  font-family: "Geo";
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;
const StyledButton = styled.button`
  // border: 2px solid white;
  border: none;
  background: transparent;
  padding: 0.3em;
  width: min-content;
`;
const ButtonBar = styled.div`
  display: flex;
  justify-content: flex-end;
  // background-color: rgba(0, 0, 0, 0.2);
  margin: 0;
  position: fixed;
  width: 100vw;
  top: 0;
`;
const Header = ({ siteTitle }) => (
  <Wrapper>
    <ButtonBar>
      <StyledButton>
        <StyledLink to="/about">About</StyledLink>
      </StyledButton>
      <StyledButton>
        <StyledLink to="/faq">FAQ</StyledLink>
      </StyledButton>
    </ButtonBar>
    <H1>
      <StyledLink to="/">{siteTitle}</StyledLink>
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
