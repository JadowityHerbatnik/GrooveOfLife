import styled from "styled-components";
import AniLink from "gatsby-plugin-transition-link/AniLink";

export const StyledLink = styled(AniLink)`
  text-decoration: none;
  color: white;
`;
export const StyledAnchor = styled.a`
  text-decoration: underline;
  color: white;
`;
export const StyledIcon = styled.i`
  display: inline-block;
  font-size: 4vh;
  margin: 0 0.5vw 0 0.5vw;
  color: white;
  transition: color 0.2s;
`;
export const FlexBox = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  justify-content: ${({ justify }) => (justify ? justify : "center")};
  align-items: ${({ align }) => (align ? align : "center")};
  @media (orientation: portrait) {
    flex-direction: ${({ direction, responsive }) =>
      responsive && direction === "row" ? "column" : "row"};
  }
`;
export const WrapperButton = styled.button`
  background-color: transparent;
  padding: 0;
  border: none;
  outline: none;
  transition: opacity 0.3s;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;
