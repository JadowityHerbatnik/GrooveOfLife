import {
  TOGGLE_PLAY,
  CLEAR_BOARD,
  RANDOM_BOARD,
  MAKE_STEP,
  MUTE_SOUND,
  INCREASE_SPEED,
  DECREASE_SPEED,
} from "@reducer/action-types";

export const keybindings = {
  c: { type: CLEAR_BOARD },
  r: { type: RANDOM_BOARD },
  " ": { type: TOGGLE_PLAY },
  m: { type: MUTE_SOUND },
  s: { type: MAKE_STEP, changeChord: true },
  ArrowUp: { type: INCREASE_SPEED },
  ArrowRight: { type: INCREASE_SPEED },
  ArrowDown: { type: DECREASE_SPEED },
  ArrowLeft: { type: DECREASE_SPEED },
};
