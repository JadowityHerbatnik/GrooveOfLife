import { progressions } from "@utils/chord-progressions";
import { PLAY_ALL, PLAY_PRESET } from "@reducer/action-types";

export const initialState = {
  mute: false,
  beatsPerChord: 2,
  speedms: 250,
  playMode: PLAY_ALL,
  progressionMode: PLAY_PRESET,
  // prettier-ignore
  scale: [ true, false, false, true, false, true, false, false, true, false, true, false, ],
  userChord: ["C", "D#", "F", "G#", "A#"],
  progressionName: "default",
  progression: progressions["default"],
  activeColumn: null,
  board: [[]],
  aliveCells: [],
  isPlaying: false,
  isSuspended: false,
  chord: 0,
  showSettings: false,
  showTutorial:
    typeof localStorage === "undefined"
      ? true
      : JSON.parse(localStorage.getItem("showTutorial") || true),
  isMouseDown: false,
};
