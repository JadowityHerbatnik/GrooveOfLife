import React from "react"
import Buttons from "./Buttons.js"
import Board from "./Board.js"
import styled from "styled-components"
const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const Game = () => {
  return (
    <GameWrapper>
      <Buttons />
      <Board />
    </GameWrapper>
  )
}

export default Game
