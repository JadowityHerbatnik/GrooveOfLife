import React, { useRef, useState, useEffect, useReducer, useContext } from "react";
import styled from "styled-components";
import ButtonBar from "@home/ButtonBar.js";
import Board from "@home/Board.js";
import { HeightContext } from "@common/Layout.js";
import Settings from "@home/Settings.js";
import { debounce } from "lodash";
import reducer from "../Reducer.js";
import { progression, initialState } from "@utils/constants.js";
import { playSelectedColumn, playEntireBoard } from "@helpers/sound.js";

const GameWrapper = styled.div`
  margin: auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${({ height }) => `${height}px`};
  width: 100vw;
  @media screen and (orientation: landscape) {
    width: 85vw;
    flex-direction: row;
  }
`;
export default function Game() {
  const boardRef = useRef(null);
  const { innerHeight, headerHeight } = useContext(HeightContext);
  //prettier-ignore
  const [
    { isPlaying, isSuspended, board, aliveCells, mute, speed, speedms, playMode, showSettings, isMouseDown, progressionMode, scale, notes, column,  chord},
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
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
          dispatch({ type: "increaseSpeed" });
          break;
        case "ArrowRight":
          dispatch({ type: "increaseSpeed" });
          break;
        case "ArrowDown":
          dispatch({ type: "decreaseSpeed" });
          break;
        case "ArrowLeft":
          dispatch({ type: "decreaseSpeed" });
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
    <GameWrapper height={innerHeight - headerHeight}>
      <ButtonBar dispatch={dispatch} mute={mute} isGameRunning={isPlaying} speed={speed} />
      <Board
        dispatch={dispatch}
        isSuspended={isSuspended}
        isPlaying={isPlaying}
        ref={boardRef}
        board={board}
        mousedown={isMouseDown}
        highlightedColumn={column}
      />
      <Settings
        dispatch={dispatch}
        show={showSettings}
        scale={scale}
        playMode={playMode}
        progressionMode={progressionMode}
      />
    </GameWrapper>
  );
}
