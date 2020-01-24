import React, { useState } from "react"
import Buttons from "./Buttons.js"
import Board from "./Board.js"
import styled from "styled-components"
import { sizes } from "../utils/sizes.js"
import makeStep from "../helpers/makestep.js"
const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
function Game() {
  const [mousedown, setMouseDown] = useState(false)
  const [board, setBoard] = useState([[]])
  const [playGame, setPlayGame] = useState(false)

  function changeBoardState(whatToDo) {
    if (playGame) {
      return
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
    setBoard(prevState => newBoard)
  }
  function play() {
    setPlayGame(prevState => !prevState)
  }
  function step() {
    const newBoard = makeStep(board)
    setBoard(pewvState => newBoard)
  }
  function clickCell(i, j) {
    if (playGame) {
      return
    }
    let boardcopy = Array.from(board)
    boardcopy[i][j] = !boardcopy[i][j]
    setBoard(boardcopy)
  }
  function handleClick() {
    setMouseDown(prevState => !prevState)
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
    setupBoard(size, sizes.preferredCellSize)
  }
  if (playGame) {
    setTimeout(() => step(), 1000)
  }

  return (
    <GameWrapper>
      <Buttons
        step={() => step()}
        play={() => play()}
        changeBoardState={whatToDo => changeBoardState(whatToDo)}
      />
      <Board
        onSize={onSize}
        clickCell={(i, j) => clickCell(i, j)}
        board={board}
        handleClick={event => handleClick(event)}
        mousedown={mousedown}
      />
    </GameWrapper>
  )
}

export default Game
