import React from "react"
import Buttons from "./Buttons.js"
import Canvas from "./Canvas.js"
import styled from "styled-components"
const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const Game = () => {
  return (
    <GameWrapper>
      <Buttons />
      <Canvas />
    </GameWrapper>
  )
}

export default Game
