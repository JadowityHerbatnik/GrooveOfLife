import React, { useRef, useState, useEffect, useReducer } from "react";
import styled from "styled-components";
import Buttons from "./Buttons.js";
import Board from "./Board.js";
import Settings from "./Settings.js";
import { debounce } from "lodash";
import reducer from "../components/Reducer.js";
import { progression, initialState } from "../utils/constants.js";
import { playSelectedColumn, playEntireBoard } from "../helpers/sound.js";

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
    height: 83vh;
    width: 80vw;
    justify-content: center;
    flex-direction: row;
  }
`;
export default function Game() {
  console.log("render");
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [innerHeight, setInnerHeight] = useState();
  const boardRef = useRef(null);

  //prettier-ignore
  const [
    { isPlaying, isSuspended, board, aliveCells, mute, speed, speedms, playMode, progressionMode, scale, notes, column,  chord},
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    setInnerHeight(window.innerHeight);
    const recalculate = debounce(() => {
      const { width, height } = boardRef.current.getBoundingClientRect();
      if (!!width && !!height) {
        dispatch({ type: "dimensions", dimensions: [width, height] });
      }
    }, 100);
    window.addEventListener("resize", recalculate);
    recalculate();
    return () => window.removeEventListener("resize", recalculate);
  }, [innerHeight]);

  useEffect(
    () => {
      if (isSuspended || mute || !aliveCells.length || !notes.length) {
        return;
      }
      const chordToPlay = progressionMode === "auto" ? progression[chord] : notes;
      if (playMode === "entireBoard") {
        playEntireBoard(aliveCells, board, speedms, chordToPlay);
      } else {
        playSelectedColumn(aliveCells, column, speedms, board, chordToPlay);
      }
    },
    //prettier-ignore
    [ board, aliveCells, column, playMode, isSuspended, notes, mute, progressionMode, speedms, chord, ],
  );

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
          dispatch({ type: "togglePlaying" });
          break;
        case "s":
          dispatch({
            type: playMode === "entireBoard" ? "newBoard" : "nextColumn",
            changeChord: true,
          });
          break;
        case "m":
          dispatch({ type: "mute" });
          break;
        case "ArrowUp":
          dispatch({
            type: "increaseSpeed",
          });
          break;
        case "ArrowRight":
          dispatch({
            type: "increaseSpeed",
          });
          break;
        case "ArrowDown":
          dispatch({
            type: "decreaseSpeed",
          });
          break;
        case "ArrowLeft":
          dispatch({
            type: "decreaseSpeed",
          });
          break;
        case "Escape":
          setShowSettings(false);
          break;
        case "S":
          setShowSettings(true);
          break;
        //no default
      }
    }
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [speed, playMode, notes, column]);

  useEffect(() => {
    let iteration = 0;
    const ID = setInterval(() => {
      if (isPlaying) {
        iteration = iteration === speed ? 0 : (iteration += 1);
        if (iteration === speed) {
          dispatch({
            type: playMode === "entireBoard" ? "newBoard" : "nextColumn",
            changeChord: true,
          });
        } else {
          dispatch({ type: playMode === "entireBoard" ? "newBoard" : "nextColumn" });
        }
      }
    }, speedms);
    return () => {
      clearInterval(ID);
    };
  }, [speed, speedms, isPlaying, mute, notes, playMode]);

  return (
    <GameWrapper height={innerHeight}>
      <Buttons
        toggleMute={() => dispatch({ type: "mute" })}
        togglePlaying={() => dispatch({ type: "togglePlaying" })}
        toggleSettings={() => setShowSettings(true)}
        mute={mute}
        changeBoardState={(whatToDo) => dispatch({ type: whatToDo })}
        isGameRunning={isPlaying}
        speed={speed}
        sliderChange={(e) => dispatch({ type: "speed", payload: parseInt(e.target.value) })}
      />
      <Board
        suspend={() => dispatch({ type: "suspend" })}
        resume={() => dispatch({ type: "resume" })}
        isSuspended={isSuspended}
        isPlaying={isPlaying}
        ref={boardRef}
        clickCell={(i, j) => dispatch({ type: "boardClick", coordinates: [i, j] })}
        board={board}
        handleClick={(direction) => setIsMouseDown(direction === "down" ? true : false)}
        mousedown={isMouseDown}
        highlightedColumn={column}
      />
      <Settings
        show={showSettings}
        scale={scale}
        toggleSettings={() => setShowSettings(false)}
        changeGameMode={(event) => dispatch({ type: event.target.value })}
        changeProgressionMode={(event) =>
          dispatch({ type: "progressionMode", mode: event.target.value })
        }
        playMode={playMode}
        progressionMode={progressionMode}
        toggleNote={(keyIndex) => dispatch({ type: "scale", key: keyIndex })}
      />
    </GameWrapper>
  );
}
