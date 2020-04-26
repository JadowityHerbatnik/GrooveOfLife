import styled, { css } from "styled-components";
import AniLink from "gatsby-plugin-transition-link/AniLink";
import { FadeIn, FadeOut, SlideInUp } from "@styles/animations";

export const ModalContainer = styled.div`
  margin: auto;
  padding: 0 10px 10px 10px;
  border: ${({ colors }) => `2px solid ${colors.border}`};
  background-color: ${({ colors }) => colors.background};
  box-shadow: 10px 10px 0px 0px rgba(0, 0, 0, 0.75);
  position: relative;
  top: -100vh;
  animation: ${() => css`0.5s ease ${SlideInUp}`};
  transform: translateY(${({ show }) => (show ? "100vh" : "-100vh")});
  transition: transform 1s;
`;
export const DimmedBackground = styled.div`
  animation: ${({ show }) => css`0.2s ease ${show ? FadeIn : FadeOut}`};
  height: 100vh;
  width: 100vw;
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  background-color: ${({ color }) => `${color}cc`};
`;
export const SvgIcon = styled.div`
  background-color: ${({ color }) => color};
  mask: ${({ svg }) => `url(${svg}) no-repeat center /contain`};
`;
export const Grid = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  justify-content: stretch;
`;
export const StyledLink = styled(AniLink)`
  text-decoration: none;
  color: ${({ color }) => color};
  &:hover {
    color: ${({ color }) => color};
    text-decoration: none;
  }
`;
export const StyledAnchor = styled.a`
  text-decoration: underline;
  color: inherit;
`;
export const StyledIcon = styled.i`
  display: inline-block;
  font-size: 5vh;
  margin: 0 0.5vw 0 0.5vw;
  // margin: 0.5vw;
  color: ${({ color }) => (color ? color : "white")};
  transition: color 0.2s;
`;
export const StyledLabel = styled.p`
  font-family: Geo;
  font-size: 1.5em;
  color: ${({ color }) => color};
`;
export const FlexBox = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => (direction ? direction : "row")};
  justify-content: ${({ justify }) => (justify ? justify : "center")};
  align-items: ${({ align }) => (align ? align : "center")};
  ${({ responsive }) =>
    responsive &&
    `@media (orientation: portrait) {
    flex-direction: ${({ direction }) => (direction === "row" ? "column" : "row")};
  }
`}
`;
export const WrapperButton = styled.button`
  background-color: transparent;
  padding: 0;
  border: none;
  outline: none;
  transition: opacity 0.3s;
  cursor: pointer;
  width: min-content;
  margin: auto;
  color: inherit;
`;
