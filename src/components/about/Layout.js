import React, { useContext } from "react";
import styled from "styled-components";
import { StyledIcon, WrapperButton } from "@common/Generic.js";
import { HeightContext, ThemeContext } from "@common/Layout.js";
import { Link, animateScroll } from "react-scroll";

const Container = styled.div`
  grid: 1fr 70px/ 1fr;
  display: grid;
  grid-gap: 3vh;
  height: ${({ height }) => `${height}px`};
  width: 100vw;
`;
const ScrollToTop = ({ color }) => (
  <StyledIcon
    onClick={() => animateScroll.scrollToTop()}
    className="icon-down-open"
    style={{ transform: "rotate(180deg)" }}
    color={color}
  ></StyledIcon>
);
const ScrollDown = ({ target, duration, color }) => {
  return (
    <Link to={target} duration={duration} smooth={true}>
      <StyledIcon className="icon-down-open" color={color}></StyledIcon>
    </Link>
  );
};
const ScrollButton = styled(WrapperButton)`
  margin: auto;
  width: min-content;
`;
export const Layout = ({ children, name, scrollTo }) => {
  const { innerHeight, headerHeight } = useContext(HeightContext);
  const colors = useContext(ThemeContext);

  return (
    <Container id={name} height={name === "intro" ? innerHeight - headerHeight : innerHeight}>
      {children}
      <ScrollButton>
        {scrollTo === "top" ? (
          <ScrollToTop color={colors.white} />
        ) : (
          <ScrollDown color={colors.white} duration={700} target={scrollTo}></ScrollDown>
        )}
      </ScrollButton>
    </Container>
  );
};
