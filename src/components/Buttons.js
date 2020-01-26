import React from "react"
import styled from "styled-components"

const Button = styled.button`
  background-color: transparent;
  font-size: 2.5vh;
  padding: 0;
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
const StyledSlider = styled.input`
  width: 30%;
  margin: auto;
  // appearance: none;
  background: transparent;
  outline: none;
`
const Buttons = props => {
  return (
    <>
      <ButtonWrapper>
        <Button onClick={props.play} play={props.playGame}>
          Play/Pause
        </Button>
        <Button onClick={() => props.changeBoardState("randomize")}>
          Random
        </Button>
        <Button onClick={props.step}>Step</Button>
        <Button onClick={() => props.changeBoardState("clear")}>Clear</Button>
      </ButtonWrapper>
      <StyledSlider
        type="range"
        min="50"
        max="1000"
        step="25"
        value={props.speed}
        onChange={event => props.sliderChange(event)}
      />
    </>
  )
}
export default Buttons
