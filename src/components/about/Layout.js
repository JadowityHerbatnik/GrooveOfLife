import React, { useContext } from "react";
import styled from "styled-components";
import { StyledIcon, WrapperButton } from "@common/Generic.js";
import { HeightContext } from "@common/Layout.js";
import { Link, animateScroll } from "react-scroll";

const ScrollAnchor = ({ target, duration }) => {
  return (
    <Link to={target} duration={duration} smooth={true}>
      <StyledIcon className="icon-down-open"></StyledIcon>
    </Link>
  );
};
const Container = styled.div`
  grid: 1fr 70px/ 1fr;
  display: grid;
  grid-gap: 3vh;
  height: ${({ height }) => `${height}px`};
  width: 100vw;
`;
export const Layout = ({ children, name, scrollTo }) => {
  const { innerHeight, headerHeight } = useContext(HeightContext);
  return (
    <Container id={name} height={name === "intro" ? innerHeight - headerHeight : innerHeight}>
      {children}
      <WrapperButton>
        {scrollTo === "top" ? (
          <StyledIcon
            onClick={() => animateScroll.scrollToTop()}
            className="icon-down-open"
            style={{ transform: "rotate(180deg)" }}
          ></StyledIcon>
        ) : (
          <ScrollAnchor duration={700} target={scrollTo}></ScrollAnchor>
        )}
      </WrapperButton>
    </Container>
  );
};
