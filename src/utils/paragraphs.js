import React from "react";
import { StyledAnchor } from "@common/Generic.js";
import { colors } from "@utils/constants.js";
const { grey, black, yellow, red, green } = colors;

const WikiLink = (
  <StyledAnchor target="_blank" href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
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
    Yeah, this is yet another implementation of the famous Game of Life...but this one utilizes{" "}
    {TonejsLink} library!
    <br />
    <br /> If you don't know, Game of Life is a cool cellular automata invented by John Conway. For
    a nice definition, here's a {WikiLink} link, I'm not gonna copypaste it.
  </>
);
export const rules = (
  <>
    Each cell can become <span className="green">alive</span> or <span className="red">dead</span>{" "}
    depending on how many alive <span className="white">neighbours</span> it has. If an active cell
    has more than 3 neighbours or less than 2 it'll die of overpopulation or solitude respectively.
    <br /> If a dead has exactly 3 neighbours, the neighbours will reproduce and the cell will
    become alive (so lifelike!)
  </>
);
export const keybindings = (
  <>
    You can also use some keyboard shortcuts to control the Game
    <br />
    <br />
  </>
);
export const keybindings2 = (
  <>
    <span className="key">Space</span>
    <span className="green">Play/pause</span>
    <span className="key">R</span>
    <span className="yellow">random board</span>
    <span className="key">C</span>
    <span className="red">clean board</span>
    <span className="key">M</span>
    <span className="blue">mute sound</span>
    <span className="key">S</span>Make one step
    <div>
      <span className="key">&#8592;</span>
      <span className="key">&#8593;</span>
      <span className="key">&#8594;</span>
      <span className="key">&#8595;</span>
    </div>
    change speed
  </>
);
