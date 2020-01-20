import React from "react"
import styled from "styled-components"
import { SizeMe } from "react-sizeme"

const CanvasWrapper = styled.div`
  width: 100vw;
  height: 80vh;
`
const StyledCanvas = styled.canvas`
  width: 100vw;
  height: 70vh;
  border: 2px solid purple;
  box-sizing: border-box;
`
const Canvas = () => {
  return (
    <CanvasWrapper>
      <StyledCanvas></StyledCanvas>
    </CanvasWrapper>
  )
}
export default Canvas
