import React, { useState } from "react"
import Buttons from "./Buttons.js"
import Board from "./Board.js"
import styled from "styled-components"
import { sizes } from "../utils/sizes.js"
const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
function Game() {
  const [dimensions, setDimensions] = useState({ cols: 0, rows: 0 })
  const [mousedown, setMouseDown] = useState(false)
  const [board, setBoard] = useState([])
  // const [play, setPlay] = useState(false)

  function clickCell(i, j) {
    let boardcopy = Array.from(board)
    boardcopy[i][j] = !boardcopy[i][j]
    setBoard(prevState => boardcopy)
  }
  function handleClick() {
    setMouseDown(prevState => !prevState)
  }

  function setupBoard({ width, height }, preferredCellSize) {
    const numberOfCols = Math.ceil(width / preferredCellSize)
    const numberOfRows = Math.ceil(height / preferredCellSize)
    setBoard(() =>
      new Array(numberOfRows)
        .fill(false)
        .map(() => new Array(numberOfCols).fill(false))
    )
    setDimensions({ cols: numberOfCols, rows: numberOfRows })
  }

  const onSize = size => {
    setupBoard(size, sizes.preferredCellSize)
  }

  return (
    <GameWrapper>
      <Buttons />
      <Board
        onSize={onSize}
        dimensions={dimensions}
        clickCell={(i, j) => clickCell(i, j)}
        board={board}
        handleClick={event => handleClick(event)}
        mousedown={mousedown}
      />
    </GameWrapper>
  )
}

export default Game
