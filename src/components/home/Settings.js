import React, { useState, useEffect, useContext } from "react";
import styled, { css } from "styled-components";
import { Keyboard } from "./Keyboard";
import { StyledLabel, WrapperButton, SvgIcon } from "@common/Generic";
import { FadeIn, FadeOut, SlideInUp } from "@styles/animations";
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
} from "@reducer/action-types";

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
const CloseSvg = styled(SvgIcon)`
  position: absolute;
  right: 10px;
  top 10px;
  width: 3vh;
  height: 3vh;
`;
const Settings = () => {
  const { showSettings, playMode, progressionMode } = useContext(StateContext);
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
        {progressionMode === PLAY_CUSTOM && <Keyboard />}
        {progressionMode === PLAY_PRESET && (
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
