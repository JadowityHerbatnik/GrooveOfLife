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
const Buttons = () => {
  return (
    <ButtonWrapper>
      <Button>Play</Button>
      <Button>Reset</Button>
      <Button>Help</Button>
    </ButtonWrapper>
  )
}
export default Buttons
