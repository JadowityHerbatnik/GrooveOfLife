import React from "react"
import Buttons from "./Buttons.js"
import Canvas from "./Canvas.js"
import styled from "styled-components"
const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const Board = () => {
  return (
    <BoardWrapper>
      <Buttons />
      <Canvas />
    </BoardWrapper>
  )
}

export default Board
