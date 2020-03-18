import React, { useRef, useState, useEffect } from "react";
import Buttons from "./Buttons.js";
import Board from "./Board.js";
import Settings from "./Settings.js";
import styled from "styled-components";
import { sizes } from "../utils/constants.js";
import { getAlive, calculateNextBoard } from "../helpers/makestep.js";
import { playSelectedColumn, playEntireBoard } from "../helpers/sound.js";

const GameWrapper = styled.div`
  margin: auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: ${props => `${props.height * 0.85}px`};
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
export default function Game() {
  const [board, setBoard] = useState([[]]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [mute, setMute] = useState(false);
  const [bps, setBps] = useState(4);
  const [gameMode, setGameMode] = useState("harmonic");
  const [highlightedColumn, setHighlightedColumn] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  // prettier-ignore
  const [chromaticScale, setChromaticScale] = useState([true, false, false, true, false, true, false, false, true, false, true, false, ]);
  // prettier-ignore
  const [scaleNames, setScaleNames] = useState(["C", "D#", "F", "G#", "A#", ]);
  const [vh, setVh] = useState(0);
  const maxSpeed = 7;
  const minSpeed = 1;
  const boardRef = useRef(null);
  const previousColumn = usePrevious(highlightedColumn);
  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  useEffect(() => {
    function recalculate() {
      setVh(window.innerHeight);
      const { width, height } = boardRef.current.getBoundingClientRect();
      setupBoard(width, height, sizes.preferredCellSize);
    }
    window.addEventListener("resize", recalculate);
    recalculate();
    return () => window.removeEventListener("resize", recalculate);
  }, [vh]);
  useEffect(() => {
    const interval = 1000 / bps;
    const aliveCells = getAlive(board);
    switch (gameMode) {
      case "harmonic":
        if (!mute && aliveCells.length !== 0 && scaleNames.length !== 0) {
          playEntireBoard(aliveCells, board, interval, scaleNames);
        }
        break;
      case "iterative":
        if (highlightedColumn === 0 && previousColumn !== 0) {
          setBoard(prevBoard => calculateNextBoard(prevBoard));
          break;
        }
        if (!mute && aliveCells.length !== 0 && scaleNames.length !== 0) {
          playSelectedColumn(aliveCells, highlightedColumn, interval, board, scaleNames);
        }
        break;
      //no default
    }
  }, [board, highlightedColumn, gameMode, bps, scaleNames, mute, previousColumn]);
  useEffect(() => {
    function handleKeyPress(event) {
      console.log(event.key);
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
          step();
          break;
        case "m":
          toggle("mute");
          break;
        case "ArrowUp":
          setBps(prevSpeed => (prevSpeed === maxSpeed ? prevSpeed : prevSpeed + 1));
          break;
        case "ArrowRight":
          setBps(prevSpeed => (prevSpeed === maxSpeed ? prevSpeed : prevSpeed + 1));
          break;
        case "ArrowDown":
          setBps(prevSpeed => (prevSpeed === minSpeed ? prevSpeed : prevSpeed - 1));
          break;
        case "ArrowLeft":
          setBps(prevSpeed => (prevSpeed === minSpeed ? prevSpeed : prevSpeed - 1));
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
  }, [bps, gameMode, scaleNames, highlightedColumn]);
  useEffect(() => {
    console.log("chuj");
    const interval = 1000 / bps;
    const ID = setInterval(() => {
      if (isGameRunning) {
        step();
      }
    }, interval);
    return () => {
      clearInterval(ID);
    };
  }, [bps, isGameRunning, mute, scaleNames, gameMode]);

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
      //no default
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
            //no default
          }
        }),
      ),
    );
  }

  function step() {
    switch (gameMode) {
      case "harmonic":
        setHighlightedColumn(null);
        setBoard(prevBoard => calculateNextBoard(prevBoard));
        break;
      case "iterative":
        setHighlightedColumn(currentlyHighlighted =>
          currentlyHighlighted + 1 >= board[0].length ? 0 : currentlyHighlighted + 1,
        );
        break;
      //no default
    }
  }

  function toggleNote(keyNumber) {
    const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    let newScale = [...chromaticScale];
    newScale[keyNumber] = !newScale[keyNumber];
    setChromaticScale(prevScale => {
      prevScale[keyNumber] = !prevScale[keyNumber];
      const newScaleNames = [];
      prevScale.forEach((value, index) => {
        if (value) {
          newScaleNames.push(notes[index]);
        }
      });
      setScaleNames(newScaleNames);
      return prevScale;
    });
    // setChromaticScale(newScale);
  }

  function clickCell(i, j) {
    const newBoard = Array.from(board);
    newBoard[i][j] = !newBoard[i][j];
    setBoard(newBoard);
  }

  function setupBoard(width, height, preferredCellSize) {
    if (width !== 0 && height !== 0) {
      const boardWidthPercent = 90;
      const numberOfCols = Math.ceil(
        ((boardWidthPercent / 100) * width) / preferredCellSize,
      );
      const numberOfRows = Math.floor(height / preferredCellSize);
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
    <GameWrapper height={vh}>
      <Buttons
        step={() => step()}
        toggle={state => toggle(state)}
        mute={mute}
        changeBoardState={whatToDo => changeBoardState(whatToDo)}
        isGameRunning={isGameRunning}
        speed={bps}
        maxSpeed={maxSpeed}
        minSpeed={minSpeed}
        sliderChange={event => setBps(parseInt(event.target.value))}
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
