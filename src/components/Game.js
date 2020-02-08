import React, { useState, useEffect } from "react"
import Buttons from "./Buttons.js"
import Board from "./Board.js"
import styled from "styled-components"
import { sizes } from "../utils/sizes.js"
import calculateNextBoard from "../helpers/makestep.js"
import sound from "../helpers/sound.js"

const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  @media screen and (orientation: landscape) {
    height: 85vh;
  }
`
export default function Game() {
  const [board, setBoard] = useState([[]])
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [isGameRunning, setIsGameRunning] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [aliveCells, setAliveCells] = useState([])
  const [mute, setMute] = useState(false)

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  })
  useEffect(() => {
    const interval = 1000 / speed
    var ID = setInterval(() => {
      if (isGameRunning) {
        step(interval)
      }
      // sound(aliveCells, board.length, board[0].length, interval)
    }, interval)
    return () => {
      clearInterval(ID)
    }
  }, [speed, isGameRunning, mute])

  function toggle(state) {
    switch (state) {
      case "mute":
        setMute(prevState => !prevState)
        break
      case "play":
        setIsGameRunning(prevState => !prevState)
        break
    }
  }

  function handleKeyPress(event) {
    switch (event.key) {
      case "c":
        changeBoardState("clear")
        break
      case "r":
        changeBoardState("randomize")
        break
      case " ":
        toggle("play")
        break
      case "s":
        step(1000 / speed)
        break
      case "m":
        toggle("mute")
        break
      case "ArrowUp":
        setSpeed(prevState => (speed < 10 ? prevState + 1 : prevState))
        break
      case "ArrowRight":
        setSpeed(prevState => (speed < 10 ? prevState + 1 : prevState))
        break
      case "ArrowDown":
        setSpeed(prevState => (speed > 1 ? prevState - 1 : prevState))
        break
      case "ArrowLeft":
        setSpeed(prevState => (speed > 1 ? prevState - 1 : prevState))
        break
    }
  }

  function changeBoardState(whatToDo) {
    if (isGameRunning) {
      toggle("play")
    }
    if (whatToDo === "clear") {
      setAliveCells([])
    }
    const newBoard = board.map(value =>
      value.map(() => {
        if (whatToDo === "clear") {
          return false
        } else if (whatToDo === "randomize") {
          return Math.random() >= 0.6 //At 0.5 there's too many alive cells also add this one to settings parameter
        }
      })
    )
    setTimeout(() => setBoard(prevState => newBoard), 100)
  }
  function step(interval) {
    setBoard(prevBoard => {
      const [newBoard, newAliveCells] = calculateNextBoard(prevBoard)
      setAliveCells(newAliveCells)
      if (!mute && newAliveCells.length !== 0) {
        sound(newAliveCells, newBoard, interval)
      }
      return newBoard
    })
  }
  function sliderChange(event) {
    const value = parseInt(event.target.value)
    setSpeed(prevState => value)
  }
  function clickCell(i, j) {
    setBoard(prevState => updateBoard(prevState))
    setAliveCells(prevState => updateAlive(prevState))
    function updateBoard(prevState) {
      let boardcopy = Array.from(prevState)
      boardcopy[i][j] = !boardcopy[i][j]
      return boardcopy
    }
    function updateAlive(prevState) {
      if (!board[i][j]) {
        const removedAliveCell = prevState.filter(
          value => value[0] !== i || value[1] !== j
        )
        return removedAliveCell
      } else {
        prevState.push([i, j])
        return prevState
      }
    }
  }
  function handleClick(direction) {
    setIsMouseDown(direction === "up" ? false : true)
  }

  function setupBoard({ width, height }, preferredCellSize) {
    if (width !== 0 && height !== 0) {
      const numberOfCols = Math.ceil(width / preferredCellSize)
      const numberOfRows = Math.ceil(height / preferredCellSize)
      setBoard(prevBoard => {
        const newBoard = new Array(numberOfRows)
          .fill(false)
          .map(() => new Array(numberOfCols).fill(false))
        const oldNumberOfRows = prevBoard.length
        const oldNumberOfCols = prevBoard[0].length
        const numberOfRowsToCopy = Math.min(numberOfRows, oldNumberOfRows)
        const numberOfColsToCopy = Math.min(numberOfCols, oldNumberOfCols)
        for (let i = 0; i < numberOfRowsToCopy; i++) {
          for (let j = 0; j < numberOfColsToCopy; j++) {
            newBoard[i][j] = prevBoard[i][j]
          }
        }
        return newBoard
      })
    }
  }

  const onSize = size => {
    setupBoard(size, sizes.preferredCellSize)
  }

  return (
    <GameWrapper>
      <Buttons
        step={() => step()}
        toggle={state => toggle(state)}
        mute={mute}
        changeBoardState={whatToDo => changeBoardState(whatToDo)}
        isGameRunning={isGameRunning}
        speed={speed}
        sliderChange={event => sliderChange(event)}
      />
      <Board
        onSize={onSize}
        clickCell={(i, j) => clickCell(i, j)}
        board={board}
        handleClick={direction => handleClick(direction)}
        mousedown={isMouseDown}
      />
    </GameWrapper>
  )
}
