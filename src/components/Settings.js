import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import "../styles/fontello/css/fontello.css";
import { keyboard, colors } from "../utils/constants.js";
import { FlexBox } from "../components/Generic.js";
import { FadeIn, FadeOut, SlideInUp } from "../styles/animations.js";
const { cyan, white, background, green, red, yellow, blue, pink, grey } = colors;

const { keyMargin, blackWidth, blackHeight, whiteHeight, whiteWidth } = keyboard;
const isBlack = (keyIndex) => {
  const blackKeysIndexes = [1, 3, 6, 8, 10];
  return blackKeysIndexes.includes(keyIndex) ? true : false;
};

const SettingsContainer = styled.div`
  margin: auto;
  padding: 0 20px 20px 20px;
  border: 1px solid ${cyan};
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 10px 10px 15px 0px rgba(0, 0, 0, 0.75);
  position: relative;
  top: -100vh;
  animation: ${() => css`0.5s ease ${SlideInUp}`};
  transform: translateY(${({ show }) => (show ? "100vh" : "-100vh")});
  transition: transform 1s;
`;
const BlurredBackground = styled.div`
  animation: ${({ show }) => css`0.2s ease ${show ? FadeIn : FadeOut}`};
  height: 100vh;
  width: 100vw;
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  @supports (not (backdrop-filter: blur())) {
    background-color: rgba(0, 0, 0, 0.7);
  }
  backdrop-filter: blur(10px);
`;
// const ModeButton = styled.button`
//   background-color: ${({ mode, buttonName }) =>
//     mode === buttonName ? "RoyalBlue" : "transparent"};
//   border: 2px solid RoyalBlue;
//   color: white;
//   font-size: 1em;
//   transition: background-color 0.3s;
// `;
const KeysButtons = (props) =>
  [...Array(12).keys()].map((keyIndex) => (
    <NoteButtons
      key={keyIndex}
      isBlack={isBlack(keyIndex)}
      note={keyIndex}
      isNoteUsed={props.scale[keyIndex] ? true : false}
      onClick={() => props.toggleNote(keyIndex)}
    ></NoteButtons>
  ));
const NoteButtons = styled.div`
  box-sizing: border-box;
  height: ${({ isBlack }) => (isBlack ? blackHeight : whiteHeight)};
  width: ${({ isBlack }) => (isBlack ? blackWidth : whiteWidth)};
  margin-left: ${({ isBlack }) => (isBlack ? `calc(${blackWidth}/-2)` : `-${keyMargin}`)};
  margin-right: ${({ isBlack }) => (isBlack ? `calc(${blackWidth}/-2)` : `-${keyMargin}`)};
  z-index: ${({ isBlack }) => (isBlack ? 1 : 0)};
  background-color: ${({ isNoteUsed, isBlack }) => (isNoteUsed ? green : isBlack ? "black" : grey)};
  border: ${() => `${keyMargin} solid black`};
  transition: background-color 0.3s;
`;
const Label = styled.p`
  font-family: Geo;
  font-size: 1.5em;
  color: ${grey};
`;
const StyledLabel = styled.label`
  margin: 3px;
  padding: 6px;
  display: inline-block;
  border: 1px solid ${grey};
  color: ${grey};
  transition: opacity 0.5s;
  font-weight: bold;
`;
const StyledInput = styled.input`
  appearance: none;
  &:checked + ${StyledLabel} {
    color: ${cyan};
    border-color: ${cyan};
		// border: 2px solid ${green};
    opacity: 1;
  }
`;
const Settings = ({
  show,
  scale,
  toggleSettings,
  changeGameMode,
  changeProgressionMode,
  playMode,
  progressionMode,
  toggleNote,
}) => {
  const [shouldRender, setRender] = useState(show);

  useEffect(() => {
    if (show) setRender(true);
  }, [show]);
  const onAnimationEnd = () => {
    if (!show) setRender(false);
  };
  return !shouldRender ? null : (
    <BlurredBackground
      id="close"
      onClickCapture={(e) => {
        if (e.target.id !== "close") {
          return;
        }
        toggleSettings();
      }}
      onAnimationEnd={onAnimationEnd}
      show={show}
    >
      <SettingsContainer show={show}>
        <Label> Gameplay mode:</Label>
        <StyledInput
          checked={playMode === "entireBoard"}
          type="radio"
          name="playMode"
          value="entireBoard"
          id="entireBoard"
          onChange={changeGameMode}
        />
        <StyledLabel htmlFor="entireBoard">Entire board</StyledLabel>
        <StyledInput
          onChange={changeGameMode}
          checked={playMode === "columns"}
          type="radio"
          name="playMode"
          id="columns"
          value="columns"
        />
        <StyledLabel htmlFor="columns">One column</StyledLabel>
        <Label>Chord progression mode:</Label>
        <StyledInput
          onChange={changeProgressionMode}
          checked={progressionMode === "auto"}
          type="radio"
          name="progressionMode"
          id="auto"
          value="auto"
        />
        <StyledLabel htmlFor="auto">Auto</StyledLabel>
        <StyledInput
          onChange={changeProgressionMode}
          checked={progressionMode === "custom"}
          type="radio"
          name="progressionMode"
          id="custom"
          value="custom"
        />
        <StyledLabel htmlFor="custom">Custom</StyledLabel>
        {progressionMode === "custom" && (
          <>
            <Label>Notes to use:</Label>
            <FlexBox row align="flex-start" style={{ margin: "10px" }}>
              <KeysButtons scale={scale} toggleNote={(keyIndex) => toggleNote(keyIndex)} />
            </FlexBox>
          </>
        )}
      </SettingsContainer>
    </BlurredBackground>
  );
};
export default Settings;
