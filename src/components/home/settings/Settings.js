import React, { useContext } from "react";
import styled from "styled-components";
import { Keyboard } from "@settings/Keyboard";
//prettier-ignore
import { ModalContainer, DimmedBackground, StyledLabel, WrapperButton, SvgIcon, } from "@common/Generic";
import { RadioInput } from "@settings/RadioInput";
import { DispatchContext, StateContext } from "@home/Game";
import { ThemeContext } from "@common/Layout";
import { Clear } from "@styles/svg/Buttons";
import { SelectProgression } from "@settings/SelectProgression";
//prettier-ignore
import { PLAY_ALL, PLAY_COLUMN, PLAY_PRESET, PLAY_CUSTOM, TOGGLE_SETTINGS, } from "@reducer/action-types";
import { useRender } from "@hooks/useRender";

const CloseSvg = styled(SvgIcon)`
  position: absolute;
  right: 10px;
  top 10px;
  width: 3vh;
  height: 3vh;
`;
const Settings = () => {
  const { showSettings, playMode, progressionMode } = useContext(StateContext);
  const colors = useContext(ThemeContext);
  const dispatch = useContext(DispatchContext);
  const [shouldRender, onAnimationEnd] = useRender(showSettings);

  return !shouldRender ? null : (
    <DimmedBackground
      color={colors.background}
      id="close"
      onClickCapture={(e) => {
        if (e.target.id !== "close") {
          return;
        }
        dispatch({ type: TOGGLE_SETTINGS });
      }}
      onAnimationEnd={onAnimationEnd}
      show={showSettings}
    >
      <ModalContainer colors={colors} show={showSettings}>
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
      </ModalContainer>
    </DimmedBackground>
  );
};
export default Settings;
