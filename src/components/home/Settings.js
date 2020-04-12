import React, { useState, useEffect, useContext } from "react";
import styled, { css } from "styled-components";
import "../../styles/fontello/css/fontello.css";
import { keyboard } from "@utils/constants.js";
import { FlexBox } from "@common/Generic.js";
import { FadeIn, FadeOut, SlideInUp } from "@styles/animations.js";
import { RadioInput } from "@home/RadioInput";
import { DispatchContext, StateContext } from "@home/Game";
import { ThemeContext } from "@common/Layout";

const { keyMargin, blackWidth, blackHeight, whiteHeight, whiteWidth } = keyboard;

const isBlack = (keyIndex) => {
  const blackKeysIndexes = [1, 3, 6, 8, 10];
  return blackKeysIndexes.includes(keyIndex) ? true : false;
};

const SettingsContainer = styled.div`
  margin: auto;
  padding: 0 20px 20px 20px;
  border: ${({ colors }) => `2px solid ${colors.border}`};
  background-color: ${({ colors }) => colors.background};
  box-shadow: 10px 10px 0px 0px rgba(0, 0, 0, 0.75);
  position: relative;
  top: -100vh;
  animation: ${() => css`0.5s ease ${SlideInUp}`};
  transform: translateY(${({ showSettings }) => (showSettings ? "100vh" : "-100vh")});
  transition: transform 1s;
`;
const BlurredBackground = styled.div`
  animation: ${({ showSettings }) => css`0.2s ease ${showSettings ? FadeIn : FadeOut}`};
  height: 100vh;
  width: 100vw;
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  background-color: ${({ color }) => `${color}cc`};
`;
const KeysButtons = (props) =>
  [...Array(12).keys()].map((keyIndex) => (
    <NoteButtons
      colors={props.colors}
      key={keyIndex}
      isBlack={isBlack(keyIndex)}
      note={keyIndex}
      isNoteUsed={props.scale[keyIndex] ? true : false}
      onClick={() => props.dispatch({ type: "scale", key: keyIndex })}
    ></NoteButtons>
  ));
const NoteButtons = styled.div`
  box-sizing: border-box;
  height: ${({ isBlack }) => (isBlack ? blackHeight : whiteHeight)};
  width: ${({ isBlack }) => (isBlack ? blackWidth : whiteWidth)};
  margin-left: ${({ isBlack }) => (isBlack ? `calc(${blackWidth}/-2)` : `-${keyMargin}`)};
  margin-right: ${({ isBlack }) => (isBlack ? `calc(${blackWidth}/-2)` : `-${keyMargin}`)};
  z-index: ${({ isBlack }) => (isBlack ? 1 : 0)};
  background-color: ${({ isNoteUsed, isBlack, colors }) =>
    isNoteUsed ? colors.green : isBlack ? "black" : colors.grey};
  border: ${() => `${keyMargin} solid black`};
  transition: background-color 0.3s;
`;
const Label = styled.p`
  font-family: Geo;
  font-size: 1.5em;
  color: ${({ color }) => color};
`;
//prettier-ignore
const Settings = () => {
  const { showSettings, scale, playMode, progressionMode  } = useContext(StateContext)
  const [shouldRender, setRender] = useState(showSettings);
  const colors = useContext(ThemeContext)
  const dispatch = useContext(DispatchContext)

  useEffect(() => {
    if (showSettings) setRender(true);
  }, [showSettings]);

  const onAnimationEnd = () => {
    if (!showSettings) setRender(false);
  };

  return !shouldRender ? null : (
    <BlurredBackground
      color={colors.background}
      id="close"
      onClickCapture={(e) => {
        if (e.target.id !== "close") {
          return;
        }
        dispatch( { type: "toggleSettings" } )
      }}
      onAnimationEnd={onAnimationEnd}
      showSettings={showSettings}
    >
      <SettingsContainer colors={colors} showSettings={showSettings}>
        <Label color={colors.grey}> Gameplay mode:</Label>
        <RadioInput dependency={playMode} name="playMode" value="entireBoard" />
        <RadioInput dependency={playMode} name="playMode" value="columns" />
        <Label color={colors.grey}>Chord progression mode:</Label>
        <RadioInput dependency={progressionMode} name="progressionMode" value="auto" />
        <RadioInput dependency={progressionMode} name="progressionMode" value="custom" />
        {progressionMode === "custom" && (
          <>
            <Label color={colors.grey}>Notes to use:</Label>
            <FlexBox row align="flex-start" style={{ margin: "10px" }}>
              <KeysButtons colors={colors} scale={scale} dispatch={dispatch}/>
            </FlexBox>
          </>
        )}
      </SettingsContainer>
    </BlurredBackground>
  );
};
export default Settings;
