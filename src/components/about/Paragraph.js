import styled from "styled-components";
import { colors } from "@utils/constants.js";
const { white, yellow, red, green, blue, grey, black, brblack } = colors;

export const Paragraph = styled.p`
  margin: auto;
  font-size: 16px;
  @media (min-width: 960px) {
    font-size: 22px;
  }
  @media (min-width: 300px) and (max-width: 960px) {
    font-size: calc(16px + 6 * (100vw - 300px) / (960 - 300));
  }
  padding: 30px 10px 30px 10px;
  max-width: 90%;
  @media (orientation: landscape) {
    max-width: 70%;
  }
  & span.green {
    color: ${green};
  }
  & span.white {
    color: ${white};
  }
  & span.blue {
    color: ${blue};
  }
  & span.yellow {
    color: ${yellow};
  }
  & span.red {
    color: ${red};
  }
  & span.key {
    display: inline-block;
    margin: 0.3em;
    padding: 0.5em;
    border: 1px solid ${brblack};
    color: ${grey};
    background-color: ${brblack};
  }
`;
