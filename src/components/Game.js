import React from "react"
import Buttons from "./Buttons.js"
import Board from "./Board.js"
import styled from "styled-components"
const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
function getBoardSize({ width, height }, preferredCellSize) {
  let numberOfCols = Math.ceil(width / preferredCellSize)
  let numberOfRows = Math.ceil(height / preferredCellSize)
  return { cols: numberOfCols, rows: numberOfRows }
}
function Game() {
  return (
    <GameWrapper>
      <Buttons />
      <Board
        getBoardSize={({ width, height }, preferredCellSize) =>
          getBoardSize({ width, height }, preferredCellSize)
        }
      />
    </GameWrapper>
  )
}

export default Game
