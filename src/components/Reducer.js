import { sizes, music, notesInOrder } from "@utils/constants.js";
import { isEqual } from "lodash";
import { getAlive, calculateNextBoard } from "@helpers/makestep.js";
const { minSpeed, maxSpeed } = music;

const chordReducer = (state, action, nextAlive = []) => {
  if (state.playMode === "entireBoard" && isEqual(nextAlive, state.aliveCells)) {
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
    case "togglePlaying":
      return { ...state, isPlaying: !state.isPlaying };
    case "resume":
      return { ...state, isSuspended: false, isPlaying: true };
    case "suspend":
      return { ...state, isSuspended: true, isPlaying: false };
    case "clear":
      return {
        ...state,
        isPlaying: false,
        board: state.board.map((val) => val.map(() => false)),
        aliveCells: [],
      };
    case "randomize":
      const randomBoard = state.board.map((val) => val.map(() => Math.random() >= 0.8));
      return {
        ...state,
        board: randomBoard,
        aliveCells: getAlive(randomBoard),
      };
    case "dimensions":
      return { ...state, board: dimensionReducer(state, action) };
    case "boardClick":
      const [i, j] = action.coordinates;
      const clicked = Array.from(state.board);
      clicked[i][j] = !clicked[i][j];

      return { ...state, board: clicked, aliveCells: getAlive(clicked) };
    case "newBoard":
      return newBoardReducer(state, action);
    case "nextColumn":
      return nextColumnReducer(state, action);
    case "step":
      return state.playMode === "entireBoard"
        ? newBoardReducer(state, action)
        : nextColumnReducer(state, action);
    case "mute":
      return { ...state, mute: !state.mute };
    case "speed":
      return { ...state, speed: action.payload, speedms: 1000 / action.payload };
    case "increaseSpeed":
      const incSpeed = state.speed === maxSpeed ? state.speed : state.speed + 1;
      return { ...state, speed: incSpeed, speedms: 1000 / incSpeed };
    case "decreaseSpeed":
      const decSpeed = state.speed === minSpeed ? state.speed : state.speed - 1;
      return { ...state, speed: decSpeed, speedms: 1000 / decSpeed };
    case "columns":
      return { ...state, playMode: action.type };
    case "entireBoard":
      return { ...state, playMode: action.type, activeColumn: null };
    case "auto":
      return { ...state, progressionMode: action.type };
    case "custom":
      return { ...state, progressionMode: action.type };
    case "toggleSettings":
      return { ...state, showSettings: !state.showSettings };
    case "mouseDown":
      return { ...state, isMouseDown: action.payload };
    case "scale":
      state.scale[action.key] = !state.scale[action.key];
      const newNotes = [];
      state.scale.forEach((value, index) => {
        if (value) {
          newNotes.push(notesInOrder[index]);
        }
      });
      return { ...state, scale: state.scale, notes: newNotes };
    case "changeProgression":
      return { ...state, progression: action.payload, chord: 0 };
    default:
      throw new Error();
  }
}
