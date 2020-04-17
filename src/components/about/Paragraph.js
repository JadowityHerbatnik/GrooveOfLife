import styled from "styled-components";

export const Paragraph = styled.article`
  margin: auto;
  font-size: 13px;
  @media (min-width: 960px) {
    font-size: 22px;
  }
  @media (min-width: 300px) and (max-width: 960px) {
    font-size: calc(13px + 9 * (100vw - 300px) / (960 - 300));
  }
  max-width: 90%;
  @media (orientation: landscape) {
    max-width: 70%;
  }
  padding: 30px 10px 30px 10px;
  & span.green {
    color: ${({ colors }) => colors.green};
  }
  & span.white {
    color: ${({ colors }) => colors.white};
  }
  & span.blue {
    color: ${({ colors }) => colors.blue};
  }
  & span.yellow {
    color: ${({ colors }) => colors.yellow};
  }
  & span.red {
    color: ${({ colors }) => colors.red};
  }
`;
