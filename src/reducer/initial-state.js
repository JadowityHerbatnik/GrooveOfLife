import { progression } from "@utils/chord-progressions";
import { PLAY_ALL, PLAY_PRESET } from "@reducer/action-types";

export const initialState = {
  mute: false,
  speed: 4,
  speedms: 250,
  playMode: PLAY_ALL,
  progressionMode: PLAY_PRESET,
  // prettier-ignore
  scale: [ true, false, false, true, false, true, false, false, true, false, true, false, ],
  notes: ["C", "D#", "F", "G#", "A#"],
  progression: progression,
  activeColumn: null,
  board: [[]],
  aliveCells: [],
  isPlaying: false,
  isSuspended: false,
  chord: 0,
  showSettings: false,
  isMouseDown: false,
};
