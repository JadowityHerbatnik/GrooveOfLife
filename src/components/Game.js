import React, { useState, useEffect } from "react";
import Buttons from "./Buttons.js";
import Board from "./Board.js";
import styled from "styled-components";
import { sizes } from "../utils/constants.js";
import calculateNextBoard from "../helpers/makestep.js";
import { playSelectedColumn, playEntireBoard } from "../helpers/sound.js";

const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  @media screen and (orientation: landscape) {
    height: 85vh;
  }
`;
export default function Game() {
  const [board, setBoard] = useState([[]]);
  const [boardWidth, setBoardWidth] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [mute, setMute] = useState(false);
  const [speed, setSpeed] = useState(4);
  const [gameMode, setGameMode] = useState("harmonic");
  const [highlightedColumn, setHighlightedColumn] = useState(null);
  const maxSpeed = 7;

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  });
  useEffect(() => {
    const interval = 1000 / speed;
    const ID = setInterval(() => {
      if (isGameRunning) {
        step(interval);
      }
    }, interval);
    return () => {
      clearInterval(ID);
    };
  }, [speed, isGameRunning, mute]);

  function toggle(state) {
    switch (state) {
      case "mute":
        setMute(prevState => !prevState);
        break;
      case "play":
        setIsGameRunning(prevState => !prevState);
        break;
    }
  }

  function sliderChange(event) {
    setSpeed(parseInt(event.target.value));
  }

  function handleKeyPress(event) {
    switch (event.key) {
      case "c":
        changeBoardState("clear");
        break;
      case "r":
        changeBoardState("randomize");
        break;
      case " ":
        toggle("play");
        break;
      case "s":
        step(1000 / speed);
        break;
      case "m":
        toggle("mute");
        break;
      case "ArrowUp":
        setSpeed(prevState => (speed < maxSpeed ? prevState + 1 : prevState));
        break;
      case "ArrowRight":
        setSpeed(prevState => (speed < maxSpeed ? prevState + 1 : prevState));
        break;
      case "ArrowDown":
        setSpeed(prevState => (speed > 1 ? prevState - 1 : prevState));
        break;
      case "ArrowLeft":
        setSpeed(prevState => (speed > 1 ? prevState - 1 : prevState));
        break;
    }
  }

  function changeBoardState(whatToDo) {
    if (isGameRunning) {
      toggle("play");
    }
    const newBoard = board.map(value =>
      value.map(() => {
        switch (whatToDo) {
          case "clear":
            return false;
          case "randomize":
            return Math.random() >= 0.8; //At 0.5 there's too many alive cells also add this one to settings parameter
        }
      }),
    );
    setBoard(newBoard);
  }
  function step(interval) {
    switch (gameMode) {
      case "harmonic":
        setHighlightedColumn(null);
        setBoard(prevBoard => {
          const [newBoard, newAliveCells] = calculateNextBoard(prevBoard);
          if (!mute && newAliveCells.length !== 0) {
            playEntireBoard(newAliveCells, newBoard, interval);
          }
          return newBoard;
        });
        break;
      case "iterative":
        setHighlightedColumn(currentHighlight => {
          const nextColumn =
            currentHighlight + 1 >= board[0].length ? 0 : currentHighlight + 1;
          setBoard(prevBoard => {
            const [newBoard, newAliveCells] = calculateNextBoard(prevBoard);
            if (!mute && newAliveCells.length !== 0) {
              playSelectedColumn(newAliveCells, nextColumn, interval, newBoard);
            }
            return currentHighlight === board[0].length - 1
              ? newBoard
              : prevBoard;
          });
          return nextColumn;
        });
        break;
    }
  }
  function clickCell(i, j) {
    setBoard(prevState => updateBoard(prevState));
    function updateBoard(prevState) {
      let boardcopy = Array.from(prevState);
      boardcopy[i][j] = !boardcopy[i][j];
      return boardcopy;
    }
  }
  function handleClick(direction) {
    setIsMouseDown(direction === "up" ? false : true);
  }

  function setupBoard({ width, height }, preferredCellSize) {
    if (width !== 0 && height !== 0) {
      // 100vw board doesn't look good on wide screens
      const boardWidthPercent = width / height >= 2 ? 60 : 94;
      setBoardWidth(boardWidthPercent);
      const numberOfCols = Math.ceil(
        ((boardWidthPercent / 100) * width) / preferredCellSize,
      );
      const numberOfRows = Math.ceil(height / preferredCellSize);
      setBoard(prevBoard => {
        const newBoard = new Array(numberOfRows)
          .fill(false)
          .map(() => new Array(numberOfCols).fill(false));
        const oldNumberOfRows = prevBoard.length;
        const oldNumberOfCols = prevBoard[0].length;
        const numberOfRowsToCopy = Math.min(numberOfRows, oldNumberOfRows);
        const numberOfColsToCopy = Math.min(numberOfCols, oldNumberOfCols);
        for (let i = 0; i < numberOfRowsToCopy; i++) {
          for (let j = 0; j < numberOfColsToCopy; j++) {
            newBoard[i][j] = prevBoard[i][j];
          }
        }
        return newBoard;
      });
    }
  }

  const onSize = boardDimensions => {
    setupBoard(boardDimensions, sizes.preferredCellSize);
  };

  return (
    <GameWrapper>
      <Buttons
        step={speed => step(speed)}
        toggle={state => toggle(state)}
        mute={mute}
        changeBoardState={whatToDo => changeBoardState(whatToDo)}
        isGameRunning={isGameRunning}
        speed={speed}
        maxSpeed={maxSpeed}
        sliderChange={event => sliderChange(event)}
      />
      <Board
        boardWidth={boardWidth}
        onSize={onSize}
        clickCell={(i, j) => clickCell(i, j)}
        board={board}
        handleClick={direction => handleClick(direction)}
        mousedown={isMouseDown}
        highlightedColumn={highlightedColumn}
      />
    </GameWrapper>
  );
}
