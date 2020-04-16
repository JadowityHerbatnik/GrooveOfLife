import React, { useState, useEffect, useContext } from "react";
import styled, { css } from "styled-components";
import "../../styles/fontello/css/fontello.css";
import { keyboard } from "@utils/constants.js";
import { FlexBox, StyledLabel, WrapperButton, SvgIcon } from "@common/Generic.js";
import { FadeIn, FadeOut, SlideInUp } from "@styles/animations.js";
import { RadioInput } from "@home/RadioInput";
import { DispatchContext, StateContext } from "@home/Game";
import { ThemeContext } from "@common/Layout";
import { Clear } from "@styles/svg/Buttons";
import { SelectProgression } from "@home/SelectProgression";
import {
  PLAY_ALL,
  PLAY_COLUMN,
  PLAY_PRESET,
  PLAY_CUSTOM,
  TOGGLE_SETTINGS,
  SET_SCALE,
} from "@reducer/action-types";

const { keyMargin, blackWidth, blackHeight, whiteHeight, whiteWidth } = keyboard;

const isBlack = (keyIndex) => {
  const blackKeysIndexes = [1, 3, 6, 8, 10];
  return blackKeysIndexes.includes(keyIndex) ? true : false;
};

const SettingsContainer = styled.div`
  margin: auto;
  padding: 0 10px 10px 10px;
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
      onClick={() => props.dispatch({ type: SET_SCALE, key: keyIndex })}
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
const CloseSvg = styled(SvgIcon)`
  position: absolute;
  right: 10px;
  top 10px;
  width: 3vh;
  height: 3vh;
`;
const Settings = () => {
  const { showSettings, scale, playMode, progressionMode } = useContext(StateContext);
  const [shouldRender, setRender] = useState(showSettings);
  const colors = useContext(ThemeContext);
  const dispatch = useContext(DispatchContext);

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
        dispatch({ type: TOGGLE_SETTINGS });
      }}
      onAnimationEnd={onAnimationEnd}
      showSettings={showSettings}
    >
      <SettingsContainer colors={colors} showSettings={showSettings}>
        <WrapperButton onClick={() => dispatch({ type: TOGGLE_SETTINGS })}>
          <CloseSvg svg={Clear} color={colors.grey} />
        </WrapperButton>
        <StyledLabel color={colors.grey}> Gameplay mode:</StyledLabel>
        <div>
          <RadioInput dependency={playMode} name="playMode" value={PLAY_ALL} />
          <RadioInput dependency={playMode} name="playMode" value={PLAY_COLUMN} />
        </div>
        <StyledLabel color={colors.grey}>Chord progression mode:</StyledLabel>
        <div>
          <RadioInput dependency={progressionMode} name="progressionMode" value={PLAY_PRESET} />
          <RadioInput dependency={progressionMode} name="progressionMode" value={PLAY_CUSTOM} />
        </div>
        {progressionMode === "custom" && (
          <>
            <StyledLabel color={colors.grey}>Notes to use:</StyledLabel>
            <FlexBox row align="flex-start" style={{ margin: "10px" }}>
              <KeysButtons colors={colors} scale={scale} dispatch={dispatch} />
            </FlexBox>
          </>
        )}
        {progressionMode === "auto" && (
          <>
            <StyledLabel color={colors.grey}>Choose preset:</StyledLabel>
            <SelectProgression />
          </>
        )}
      </SettingsContainer>
    </BlurredBackground>
  );
};
export default Settings;
