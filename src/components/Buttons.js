import React from "react"
import styled from "styled-components"

const Button = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  &:hover {
    background-color: purple;
  }
`
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`
const Buttons = props => {
  return (
    <ButtonWrapper>
      <Button>Play</Button>
      <Button onClick={() => props.changeBoardState("randomize")}>
        Random
      </Button>
      <Button onClick={props.step}>Step</Button>
      <Button onClick={() => props.changeBoardState("clear")}>Clear</Button>
    </ButtonWrapper>
  )
}
export default Buttons
