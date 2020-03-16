import React, { useRef, useState, useEffect } from "react";
import Buttons from "./Buttons.js";
import Board from "./Board.js";
import Settings from "./Settings.js";
import styled from "styled-components";
import { sizes } from "../utils/constants.js";
import calculateNextBoard from "../helpers/makestep.js";
import { playSelectedColumn, playEntireBoard } from "../helpers/sound.js";

const GameWrapper = styled.div`
  margin: auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (orientation: landscape) {
    height: 80vh;
    width: 85vw;
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
export default function Game() {
  const [board, setBoard] = useState([[]]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [mute, setMute] = useState(false);
  const [speed, setSpeed] = useState(4);
  const [gameMode, setGameMode] = useState("harmonic");
  const [highlightedColumn, setHighlightedColumn] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [notesToUse, setNotesToUse] = useState(["C", "D#", "F", "G#", "A#"]);
  // prettier-ignore
  const [chromaticScale, setChromaticScale] = useState([ true, false, false, true, false, true, false, false, true, false, true, false, ]);
  // prettier-ignore
  const [chromaticScaleNames, setChromaticScaleNames] = useState([ "C", "D#", "F", "G#", "A#", ]);
  const maxSpeed = 7;
  const boardRef = useRef(null);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [speed]);
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
  }, [speed, isGameRunning, mute, chromaticScaleNames, gameMode]);
  useEffect(() => {
    function getBoardDimensions() {
      const { width, height } = boardRef.current.getBoundingClientRect();
      setupBoard(width, height, sizes.preferredCellSize);
    }
    window.addEventListener("resize", getBoardDimensions);
    getBoardDimensions();
    return () => window.removeEventListener("resize", getBoardDimensions);
  }, []);

  function toggle(state) {
    switch (state) {
      case "mute":
        setMute(prevState => !prevState);
        break;
      case "play":
        setIsGameRunning(prevState => !prevState);
        break;
      case "settings":
        setShowSettings(prevState => !prevState);
    }
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
        setSpeed(prevSpeed => (prevSpeed < maxSpeed ? prevSpeed + 1 : prevSpeed));
        break;
      case "ArrowRight":
        setSpeed(prevSpeed => (prevSpeed < maxSpeed ? prevSpeed + 1 : prevSpeed));
        break;
      case "ArrowDown":
        setSpeed(prevSpeed => (prevSpeed > 1 ? prevSpeed - 1 : prevSpeed));
        break;
      case "ArrowLeft":
        setSpeed(prevSpeed => (prevSpeed > 1 ? prevSpeed - 1 : prevSpeed));
        break;
      case "Escape":
        setShowSettings(false);
        break;
      case "S":
        toggle("settings");
        break;
    }
  }

  function changeBoardState(whatToDo) {
    setIsGameRunning(false);
    setBoard(prevBoard =>
      prevBoard.map(value =>
        value.map(() => {
          switch (whatToDo) {
            case "clear":
              return false;
            case "randomize":
              return Math.random() >= 0.8; //At 0.5 there's too many alive cells also add this one to settings parameter
          }
        }),
      ),
    );
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
        setHighlightedColumn(currentlyHighlighted => {
          const nextColumn =
            currentlyHighlighted + 1 >= board[0].length
              ? 0
              : currentlyHighlighted + 1;
          setBoard(prevBoard => {
            const [newBoard, newAliveCells] = calculateNextBoard(prevBoard);
            if (!mute && newAliveCells.length !== 0) {
              playSelectedColumn(newAliveCells, nextColumn, interval, newBoard);
            }
            return currentlyHighlighted === board[0].length - 1
              ? newBoard
              : prevBoard;
          });
          return nextColumn;
        });
        break;
    }
  }
  function clickCell(i, j) {
    const newBoard = Array.from(board);
    newBoard[i][j] = !newBoard[i][j];
    setBoard(newBoard);
  }

  function setupBoard({ width, height }, preferredCellSize) {
    if (width !== 0 && height !== 0) {
      const boardWidthPercent = 90;
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
        sliderChange={event => setSpeed(parseInt(event.target.value))}
      />
      <Board
        ref={boardRef}
        clickCell={(i, j) => clickCell(i, j)}
        board={board}
        handleClick={direction => setIsMouseDown(direction === "down" ? true : false)}
        mousedown={isMouseDown}
        highlightedColumn={highlightedColumn}
      />
      {showSettings && (
        <Settings
          chromaticScale={chromaticScale}
          toggle={state => toggle(state)}
          changeGameMode={mode => setGameMode(mode)}
          currentGameMode={gameMode}
          toggleNote={keyIndex => toggleNote(keyIndex)}
        />
      )}
    </GameWrapper>
  );
}
