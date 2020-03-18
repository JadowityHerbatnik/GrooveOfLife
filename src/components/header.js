import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { StyledLink } from "../components/Generic.js";

const Wrapper = styled.header`
  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  animation: ${({ animateHeader }) =>
    animateHeader ? `2s ease 1s 1 both fadein` : "none"};
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
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
const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;
const StyledButton = styled.button`
  border: none;
  background: transparent;
  padding: 0.3em;
  width: min-content;
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
        bg="linear-gradient(to right, #1f498c, #1CB5E0)"
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
