import React, { useState } from "react"
import Buttons from "./Buttons.js"
import Board from "./Board.js"
import styled from "styled-components"
const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
function Game() {
  const [dimensions, setDimensions] = useState({ cols: 0, rows: 0 })

  function getBoardSize({ width, height }, preferredCellSize) {
    const numberOfCols = Math.ceil(width / preferredCellSize)
    const numberOfRows = Math.ceil(height / preferredCellSize)
    setDimensions({ cols: numberOfCols, rows: numberOfRows })
  }
  const onSize = size => {
    getBoardSize(size, 45)
  }
  return (
    <GameWrapper>
      <Buttons />
      <Board onSize={onSize} dimensions={dimensions} />
    </GameWrapper>
  )
}

export default Game
