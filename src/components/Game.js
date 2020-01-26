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
`
function Game() {
  const [mousedown, setMouseDown] = useState(false)
  const [board, setBoard] = useState([[]])
  const [playGame, setPlayGame] = useState(false)
  const [speed, setSpeed] = useState(500)
  const [aliveCells, setAliveCells] = useState([])

  function changeBoardState(whatToDo) {
    if (playGame) {
      setPlayGame(prevState => !prevState)
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
    function toggle(prevState) {
      let boardcopy = Array.from(prevState)
      boardcopy[i][j] = !boardcopy[i][j]
      return boardcopy
    }
    setBoard(prevState => toggle(prevState))
  }
  function handleClick(direction) {
    // if (playGame) {
    //   setPlayGame(prevState => false)
    // }
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
    if (playGame) {
      const interval = 1050 - speed
      var ID = setInterval(() => {
        step()
        sound(aliveCells, board.length, board[0].length, interval)
      }, interval)
      return () => clearInterval(ID)
    }
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
