import { sizes, music, notesInOrder } from "@utils/constants";
import { isEqual } from "lodash";
import { getAlive, calculateNextBoard } from "@helpers/makestep";
import * as action_types from "@reducer/action-types";

const { minSpeed, maxSpeed, chordChangeInterval, speedStep } = music;

const chordReducer = (state, action, nextAlive = []) => {
  if (isEqual(nextAlive, state.aliveCells)) {
    return state.chord;
  }
  if (action.changeChord) {
    if (state.chord === state.progression.length - 1) {
      return 0;
    }
    return state.chord + 1;
  }
  return state.chord;
};
const dimensionReducer = (state, action) => {
  const [width, height] = action.dimensions;
  const numberOfCols = Math.floor(width / sizes.preferredCellSize) - 1;
  const numberOfRows = Math.floor(height / sizes.preferredCellSize);
  const newBoard = new Array(numberOfRows)
    .fill(false)
    .map(() => new Array(numberOfCols).fill(false));
  const oldNumberOfRows = state.board.length;
  const oldNumberOfCols = state.board[0].length;
  const numberOfRowsToCopy = Math.min(numberOfRows, oldNumberOfRows);
  const numberOfColsToCopy = Math.min(numberOfCols, oldNumberOfCols);
  for (let i = 0; i < numberOfRowsToCopy; i++) {
    for (let j = 0; j < numberOfColsToCopy; j++) {
      newBoard[i][j] = state.board[i][j];
    }
  }
  return newBoard;
};
const newBoard = (state) => calculateNextBoard(state.board);
const currentlyAlive = (state) => getAlive(state.board);
const nextAlive = (state) => getAlive(calculateNextBoard(state.board));

const nextColumnReducer = (state, action) => {
  const ifLastColumn = state.activeColumn + 1 >= state.board[0].length;
  return {
    ...state,
    activeColumn: ifLastColumn ? 0 : state.activeColumn + 1,
    board: ifLastColumn ? newBoard(state) : state.board,
    aliveCells: ifLastColumn ? nextAlive(state) : currentlyAlive(state),
    chord: chordReducer(state, action),
  };
};
const newBoardReducer = (state, action) => {
  return {
    ...state,
    board: newBoard(state),
    aliveCells: nextAlive(state),
    chord: chordReducer(state, action, nextAlive(state)),
  };
};
export default function reducer(state, action) {
  switch (action.type) {
    case action_types.TOGGLE_PLAY:
      return { ...state, isPlaying: !state.isPlaying };
    case action_types.RESUME:
      return { ...state, isSuspended: false, isPlaying: true };
    case action_types.SUSPEND:
      return { ...state, isSuspended: true, isPlaying: false };
    case action_types.CLEAR_BOARD:
      return {
        ...state,
        isPlaying: false,
        board: state.board.map((val) => val.map(() => false)),
        aliveCells: [],
      };
    case action_types.RANDOM_BOARD:
      const randomBoard = state.board.map((val) => val.map(() => Math.random() >= 0.8));
      return {
        ...state,
        board: randomBoard,
        aliveCells: getAlive(randomBoard),
      };
    case action_types.RESIZE_BOARD:
      return { ...state, board: dimensionReducer(state, action) };
    case action_types.CLICK_CELL:
      const [i, j] = action.coordinates;
      const clicked = Array.from(state.board);
      clicked[i][j] = !clicked[i][j];

      return { ...state, board: clicked, aliveCells: getAlive(clicked) };
    case action_types.MAKE_STEP:
      return state.playMode === action_types.PLAY_ALL
        ? newBoardReducer(state, action)
        : nextColumnReducer(state, action);
    case action_types.MUTE_SOUND:
      return { ...state, mute: !state.mute };
    case action_types.SET_SPEED:
      return {
        ...state,
        beatsPerChord: action.payload,
        speedms: chordChangeInterval / action.payload,
      };
    case action_types.INCREASE_SPEED:
      const incSpeed =
        state.beatsPerChord >= maxSpeed ? state.beatsPerChord : state.beatsPerChord + speedStep;
      return { ...state, beatsPerChord: incSpeed, speedms: chordChangeInterval / incSpeed };
    case action_types.DECREASE_SPEED:
      const decSpeed =
        state.beatsPerChord <= minSpeed ? state.beatsPerChord : state.beatsPerChord - speedStep;
      return { ...state, beatsPerChord: decSpeed, speedms: chordChangeInterval / decSpeed };
    case action_types.PLAY_COLUMN:
      return { ...state, playMode: action.type };
    case action_types.PLAY_ALL:
      return { ...state, playMode: action.type, activeColumn: null };
    case action_types.PLAY_PRESET:
      return { ...state, progressionMode: action.type };
    case action_types.PLAY_CUSTOM:
      return { ...state, progressionMode: action.type };
    case action_types.TOGGLE_SETTINGS:
      return { ...state, showSettings: !state.showSettings };
    case action_types.IS_MOUSEDOWN:
      return { ...state, isMouseDown: action.payload };
    case action_types.SET_SCALE:
      state.scale[action.key] = !state.scale[action.key];
      const newChord = [];
      state.scale.forEach((value, index) => {
        if (value) {
          newChord.push(notesInOrder[index]);
        }
      });
      return { ...state, scale: state.scale, userChord: newChord };
    case action_types.CHANGE_PROGRESSION:
      return { ...state, progression: action.progression, chord: 0, progressionName: action.name };
    default:
      throw new Error();
  }
}
