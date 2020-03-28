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
const TonejsLink = (
  <StyledAnchor target="_blank" href="https://tonejs.github.io/">
    Tone.js
  </StyledAnchor>
);
export const intro = (
  <>
    {/* <span style={{ fontFamily: "Geo" }}> The Sound of life </span> */}
    Yeah, this is yet another implementation of the famous Game of Life...but this one
    utilizes {TonejsLink} library!
    <br />
    <br /> If you don't know, Game of Life is a cool cellular automata invented by John
    Conway. For a nice definition, here's a {WikiLink} link, I'm not gonna copypaste it.
  </>
);
export const rules = (
  <>
    Each cell can be "alive" (white) or dead depending on how many alive neighbours it
    has. If an active cell has more than 3 neighbours or less than 2 it'll die of
    overpopulation or solitude respectively.
    <br /> If a dead has exactly 3 neighbours, the neighbours will reproduce and the cell
    will become alive (so lifelike!)
  </>
);
export const keybindings = <>You can use some keyboard shortcuts to control the Game</>;
