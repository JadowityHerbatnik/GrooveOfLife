import React, { useRef, useState, useEffect, useReducer } from "react";
import { debounce } from "lodash";
import Buttons from "./Buttons.js";
import Board from "./Board.js";
import Settings from "./Settings.js";
import styled from "styled-components";
import useDebouce from "../helpers/debounce.js";
import { sizes, progression } from "../utils/constants.js";
import { getAlive, calculateNextBoard } from "../helpers/makestep.js";
import { playSelectedColumn, playEntireBoard } from "../helpers/sound.js";

const notesInOrder = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const initialState = {
  mute: false,
  speed: 4,
  speedms: 250,
  playMode: "harmonic",
  progressionMode: "auto",
  // prettier-ignore
  scale: [ true, false, false, true, false, true, false, false, true, false, true, false, ],
  notes: ["C", "D#", "F", "G#", "A#"],
  column: null,
  boardd: [[]],
  isPlaying: false,
  chord: 0,
};
const maxSpeed = 7;
const minSpeed = 1;
const GameWrapper = styled.div`
  margin: auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: ${({ height }) => `${height && height * 0.85}px`};
  width: 100vw;
  @media screen and (orientation: landscape) {
    height: 80vh;
    width: 80vw;
    justify-content: center;
    flex-direction: row;
    // background-color: rgba(0, 0, 0, 0.2);
    @keyframes fadebckgr {
      0% {
        background-color: rgba(0, 0, 0, 0);
      }
      100% {
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
    animation: 2s ease 1s 1 both fadebckgr;
  }
`;

const chordReducer = (state, action) => {
  if (action.changeChord) {
    if (state.chord === progression.length - 1) {
      return 0;
    }
    return state.chord + 1;
  }
  return state.chord;
};
const dimensionReducer = (state, action) => {
  const [width, height] = action.dimensions;
  const numberOfCols = Math.ceil((0.9 * width) / sizes.preferredCellSize);
  const numberOfRows = Math.floor(height / sizes.preferredCellSize);
  const newBoard = new Array(numberOfRows)
    .fill(false)
    .map(() => new Array(numberOfCols).fill(false));
  const oldNumberOfRows = state.boardd.length;
  const oldNumberOfCols = state.boardd[0].length;
  const numberOfRowsToCopy = Math.min(numberOfRows, oldNumberOfRows);
  const numberOfColsToCopy = Math.min(numberOfCols, oldNumberOfCols);
  for (let i = 0; i < numberOfRowsToCopy; i++) {
    for (let j = 0; j < numberOfColsToCopy; j++) {
      newBoard[i][j] = state.boardd[i][j];
    }
  }
  return newBoard;
};
function reducer(state, action) {
  switch (action.type) {
    case "play/pause":
      return { ...state, isPlaying: !state.isPlaying };
    case "clear":
      return {
        ...state,
        isPlaying: false,
        boardd: state.boardd.map(val => val.map(() => false)),
      };
    case "randomize":
      return {
        ...state,
        boardd: state.boardd.map(val => val.map(() => Math.random() >= 0.8)),
      };
    case "dimensions":
      return { ...state, boardd: dimensionReducer(state, action) };
    case "boardClick":
      const [i, j] = action.coordinates;
      const clicked = Array.from(state.boardd);
      clicked[i][j] = !clicked[i][j];
      return { ...state, boardd: clicked };
    case "newBoard":
      return {
        ...state,
        boardd: calculateNextBoard(state.boardd),
        chord: chordReducer(state, action),
      };
    case "nextColumn":
      const ifLastColumn = state.column + 1 >= state.boardd[0].length;
      return {
        ...state,
        column: ifLastColumn ? 0 : state.column + 1,
        boardd: ifLastColumn ? calculateNextBoard(state.boardd) : state.boardd,
        chord: chordReducer(state, action),
      };
    case "mute":
      return { ...state, mute: !state.mute };
    case "speed":
      return { ...state, speed: action.payload, speedms: 1000 / action.payload };
    case "rowByRow":
      return { ...state, playMode: "iterative" };
    case "entireBoard":
      return { ...state, playMode: "harmonic", column: null };
    case "progressionMode":
      return { ...state, progressionMode: action.mode };
    case "scale":
      state.scale[action.key] = !state.scale[action.key];
      const newNotes = [];
      state.scale.forEach((value, index) => {
        if (value) {
          newNotes.push(notesInOrder[index]);
        }
      });
      return { ...state, scale: state.scale, notes: newNotes };
    default:
      throw new Error();
  }
}
export default function Game() {
  console.log("render");
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const boardRef = useRef(null);
  const [dimensions, setDimensions] = useState([0, 0]);

  //prettier-ignore
  const [
    { isPlaying, boardd, mute, speed, speedms, playMode, progressionMode, scale, notes, column,  chord},
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    function recalculate() {
      const { width, height } = boardRef.current.getBoundingClientRect();
      if (!!width && !!height) {
        dispatch({ type: "dimensions", dimensions: [width, height] });
      }
    }
    window.addEventListener("resize", debounce(recalculate, 100));
    recalculate();
    return () => window.removeEventListener("resize", debounce(recalculate, 100));
  }, []);

  useEffect(() => {
    const aliveCells = getAlive(boardd);
    const chordToPlay = progressionMode === "auto" ? progression[chord] : notes;
    // if (!isPlaying || mute) {
    //   return;
    // }
    switch (playMode) {
      case "harmonic":
        if (!mute && !!aliveCells.length && !!notes.length) {
          playEntireBoard(aliveCells, boardd, speedms, chordToPlay);
        }
        break;
      case "iterative":
        if (!mute && !!aliveCells.length && !!notes.length) {
          playSelectedColumn(aliveCells, column, speedms, boardd, chordToPlay);
        }
        break;
      //no default
    }
    // prettier-ignore
  }, [boardd, column, playMode, speed, notes, mute, progressionMode, speedms, chord]);

  useEffect(() => {
    function handleKeyPress(event) {
      switch (event.key) {
        case "c":
          dispatch({ type: "clear" });
          break;
        case "r":
          dispatch({ type: "randomize" });
          break;
        case " ":
          toggle("play");
          break;
        case "s":
          dispatch({
            type: playMode === "harmonic" ? "newBoard" : "nextColumn",
            changeChord: true,
          });
          break;
        case "m":
          toggle("mute");
          break;
        case "ArrowUp":
          dispatch({
            type: "speed",
            payload: speed === maxSpeed ? speed : speed + 1,
          });
          break;
        case "ArrowRight":
          dispatch({
            type: "speed",
            payload: speed === maxSpeed ? speed : speed + 1,
          });
          break;
        case "ArrowDown":
          dispatch({
            type: "speed",
            payload: speed === minSpeed ? speed : speed - 1,
          });
          break;
        case "ArrowLeft":
          dispatch({
            type: "speed",
            payload: speed === minSpeed ? speed : speed - 1,
          });
          break;
        case "Escape":
          setShowSettings(false);
          break;
        case "S":
          toggle("settings");
          break;
        //no default
      }
    }
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [speed, playMode, notes, column]);

  useEffect(() => {
    let iter = 0;
    const ID = setInterval(() => {
      if (isPlaying) {
        iter = iter === speed ? 0 : (iter += 1);
        if (iter === speed) {
          dispatch({
            type: playMode === "harmonic" ? "newBoard" : "nextColumn",
            changeChord: true,
          });
        } else {
          dispatch({ type: playMode === "harmonic" ? "newBoard" : "nextColumn" });
        }
      }
    }, speedms);
    return () => {
      clearInterval(ID);
    };
  }, [speed, speedms, isPlaying, mute, notes, playMode]);

  function toggle(state) {
    switch (state) {
      case "mute":
        dispatch({ type: "mute" });
        break;
      case "play":
        dispatch({ type: "play/pause" });
        break;
      case "settings":
        setShowSettings(prevState => !prevState);
      //no default
    }
  }

  return (
    <GameWrapper height={window.innerHeight}>
      <Buttons
        // step={() => step()}
        toggle={state => toggle(state)}
        mute={mute}
        changeBoardState={whatToDo => dispatch({ type: whatToDo })}
        isGameRunning={isPlaying}
        speed={speed}
        maxSpeed={maxSpeed}
        minSpeed={minSpeed}
        sliderChange={e => dispatch({ type: "speed", payload: parseInt(e.target.value) })}
      />
      <Board
        ref={boardRef}
        clickCell={(i, j) => dispatch({ type: "boardClick", coordinates: [i, j] })}
        board={boardd}
        handleClick={direction => setIsMouseDown(direction === "down" ? true : false)}
        mousedown={isMouseDown}
        highlightedColumn={column}
      />
      <Settings
        show={showSettings}
        chromaticScale={scale}
        toggle={state => toggle(state)}
        changeGameMode={mode => dispatch({ type: mode })}
        changeProgressionMode={mode => dispatch({ type: "progressionMode", mode: mode })}
        gameMode={playMode}
        progressionMode={progressionMode}
        toggleNote={keyIndex => dispatch({ type: "scale", key: keyIndex })}
      />
    </GameWrapper>
  );
}
