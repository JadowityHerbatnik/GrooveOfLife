import React from "react";
import { StyledAnchor } from "../components/Generic.js";

const WikiLink = (
  <StyledAnchor
    target="_blank"
    href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
  >
    Wikipedia
  </StyledAnchor>
);
export const intro = (
  <>
    <span style={{ fontFamily: "Geo" }}>The Game of life </span>
    is a cool cellular automata invented by John Conway. If you wanna read a nice
    definition, here's a {WikiLink} link, I'm not gonna copypaste it.
    <br />
    <br />
    Essentially, each cell can be alive (active) or dead (inactive)
  </>
);
