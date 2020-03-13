import React from "react";
import styled from "styled-components";
import "../styles/fontello/css/fontello.css";

const Button = styled.button`
  background-color: transparent;
  padding: 0;
  border: none;
  color: white;
  outline: none;
  transition: 0.5s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;
const Icon = styled.i`
  font-size: 4.5vh;
  margin: 0 2vw 0 2vw;
`;
const Container = styled.div`
  @keyframes slidefromleft {
    0% {
      transform: translateX(-100vw);
    }
    100% {
      transform: translateX(1);
    }
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: 0.5s ease 1 both slidefromleft;
  .slider {
    opacity: 0.3;
    width: 50vmin;
    appearance: none;
    margin: 1vh 0 1vh 0;
    background: black;
    outline: none;
    transition: 0.5s;
    &:hover {
      opacity: 0.5;
    }
    &::-webkit-slider-thumb {
      transition: 0.3s;
      webkit-appearance: none;
      appearance: none;
      width: 5vh;
      height: 2vh;
      background: white;
      border-radius: 3px;
      border: none;
    }
  }
`;
const Buttons = props => {
  return (
    <Container>
      <ButtonWrapper>
        <Button onClick={() => props.toggle("play")}>
          <Icon className={props.isGameRunning ? "icon-pause" : "icon-play"}></Icon>
        </Button>
        <Button onClick={() => props.step(1000 / props.speed)}>
          <Icon className="icon-forward-1"></Icon>
        </Button>
        <Button onClick={() => props.changeBoardState("randomize")}>
          <Icon className="icon-shuffle"></Icon>
        </Button>
        <Button onClick={() => props.changeBoardState("clear")}>
          <Icon className="icon-cancel"></Icon>
        </Button>
        <Button onClick={() => props.toggle("mute")}>
          <Icon className={props.mute ? "icon-volume-off" : "icon-volume-up"}></Icon>
        </Button>
        <Button onClick={() => props.toggle("settings")}>
          <Icon className="icon-cog"></Icon>
        </Button>
      </ButtonWrapper>
      <input
        className="slider"
        type="range"
        min="1"
        max={props.maxSpeed}
        step="1"
        value={props.speed}
        onChange={event => props.sliderChange(event)}
      />
    </Container>
  );
};
export default Buttons;
