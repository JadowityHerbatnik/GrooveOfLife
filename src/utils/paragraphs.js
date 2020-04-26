import React from "react";
import { StyledAnchor } from "@common/Generic.js";
//prettier-ignore
import { TOGGLE_PLAY, RANDOM_BOARD, CLEAR_BOARD, MUTE_SOUND, MAKE_STEP, } from "@reducer/action-types";
const wiki = "https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life";
const tonejs = "https://tonejs.github.io/";

const createLink = (name, url) => (
  <StyledAnchor target="_blank" href={url}>
    {name}
  </StyledAnchor>
);

export const intro = (
  <>
    Yeah, this is yet another implementation of the famous Game of Life... but this one uses{" "}
    {createLink("Tonejs", tonejs)} library to add sound!
    <br />
    <br /> If you don't know, Game of Life is a cool cellular automata invented by John Conway. For
    a nice definition, here's a {createLink("Wikipedia", wiki)} link, I'm not gonna copypaste it.
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
export const keyDescription = new Map([
  ["Space", { color: "green", desc: TOGGLE_PLAY }],
  ["R", { color: "red", desc: RANDOM_BOARD }],
  ["C", { color: "yellow", desc: CLEAR_BOARD }],
  ["M", { color: "blue", desc: MUTE_SOUND }],
  ["S", { color: "", desc: MAKE_STEP }],
  ["\u2190 \u2191 \u2192 \u2193", { color: "", desc: "Change game speed" }],
]);
// export const keybindings2 = (
//   <>
//     {/* <span className="key">Space</span> */}
//     <div style={{ backgroundColor: "grey", width: "5em", height: "2em" }}>
//       <span style={{ lineHeight: "2em" }}>Space</span>
//     </div>
//     <span className="green">Play/pause</span>
//     <span className="key">R</span>
//     <span className="yellow">random board</span>
//     <span className="key">C</span>
//     <span className="red">clean board</span>
//     <span className="key">M</span>
//     <span className="blue">mute sound</span>
//     <span className="key">S</span>Make one step
//     <div>
//       <span className="key">
//         <ArrowBackIcon />
//       </span>
//       <span className="key">
//         <ArrowUpwardIcon />
//       </span>
//       <span className="key">
//         <ArrowForwardIcon />
//       </span>
//       <span className="key">
//         <ArrowDownwardIcon />
//       </span>
//     </div>
//     change speed
//   </>
// );
