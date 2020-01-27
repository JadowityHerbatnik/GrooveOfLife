import React, { useState, useEffect } from "react"
import Buttons from "./Buttons.js"
import Board from "./Board.js"
import styled from "styled-components"
import { sizes } from "../utils/sizes.js"
import makeStep from "../helpers/makestep.js"
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
function Game() {
  const [mousedown, setMouseDown] = useState(false)
  const [board, setBoard] = useState([[]])
  const [playGame, setPlayGame] = useState(false)
  const [speed, setSpeed] = useState(500)
  const [aliveCells, setAliveCells] = useState([])

  function handleKeyPress(event) {
    switch (event.key) {
      case "c":
        changeBoardState("clear")
        break
      case "r":
        changeBoardState("randomize")
        break
      case " ":
        setPlayGame(prevState => !playGame)
        break
      case "s":
        step()
        break
    }
  }

  function changeBoardState(whatToDo) {
    if (playGame) {
      setPlayGame(prevState => !prevState)
    }
    if (whatToDo === "clear") {
      setAliveCells(prevState => [])
    }
    const newBoard = board.map(value =>
      value.map(() => {
        if (whatToDo === "clear") {
          return false
        } else if (whatToDo === "randomize") {
          return Math.random() >= 0.5 //At 0.5 there's too many alive cells also add this one to settings parameter
        }
      })
    )
    setTimeout(() => setBoard(prevState => newBoard), 100)
  }
  function play() {
    setPlayGame(prevState => !prevState)
  }
  function step() {
    const [newBoard, newAliveCells] = makeStep(board)

    // sound(aliveCells, board.length, board[0].length)
    setAliveCells(prevState => newAliveCells)
    setBoard(prevState => newBoard)
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
    setMouseDown(prevState => (direction === "up" ? false : true))
  }

  function setupBoard({ width, height }, preferredCellSize) {
    if (width !== 0 && height !== 0) {
      const numberOfCols = Math.ceil(width / preferredCellSize)
      const numberOfRows = Math.ceil(height / preferredCellSize)
      setBoard(prevState =>
        new Array(numberOfRows)
          .fill(false)
          .map(() => new Array(numberOfCols).fill(false))
      )
    }
  }

  const onSize = size => {
    setPlayGame(prevState => false)
    setupBoard(size, sizes.preferredCellSize)
  }
  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress)
    return () => window.removeEventListener("keypress", handleKeyPress)
  })
  useEffect(() => {
    const interval = 1050 - speed
    // if (playGame) {
    var ID = setInterval(() => {
      if (playGame) {
        step()
      }
      // sound(aliveCells, board.length, board[0].length, interval)
    }, interval)
    return () => clearInterval(ID)
  })

  return (
    <GameWrapper>
      <Buttons
        step={() => step()}
        play={() => play()}
        changeBoardState={whatToDo => changeBoardState(whatToDo)}
        playGame={playGame}
        speed={speed}
        sliderChange={event => sliderChange(event)}
      />
      <Board
        onSize={onSize}
        clickCell={(i, j) => clickCell(i, j)}
        board={board}
        handleClick={direction => handleClick(direction)}
        mousedown={mousedown}
      />
    </GameWrapper>
  )
}

export default Game
