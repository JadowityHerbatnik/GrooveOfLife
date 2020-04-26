import React, { useContext } from "react";
import styled from "styled-components";
import "@styles/fontello/css/fontello.css";
import { SpeedSlider } from "@home/SpeedSlider";
import { WrapperButton, SvgIcon } from "@common/Generic";
import { ThemeContext } from "@common/Layout";
import { SlideFromLeft } from "@styles/animations";
import { DispatchContext, StateContext } from "@home/Game";
import { Settings, Play, Pause, Note, Random, Clear } from "@styles/svg/Buttons";
import {
  TOGGLE_PLAY,
  CLEAR_BOARD,
  RANDOM_BOARD,
  MUTE_SOUND,
  TOGGLE_SETTINGS,
} from "@reducer/action-types";

const ButtonWrapper = styled.div`
  border-width: 1px 0 0 1px;
  border-style: solid;
  border-color: ${({ colors }) => colors.brblack};
  box-shadow: 2px 2px 0px black;
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media screen and (orientation: landscape) {
    flex-direction: column;
    margin-right: 10px;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (orientation: landscape) {
    flex-direction: row;
  }
  animation: 0.5s ease 1 both ${SlideFromLeft};
  }
`;
const StyledSvg = styled(SvgIcon)`
  width: 4vh;
  height: 4vh;
  margin: 1vh;
  ${({ muted }) => muted && `opacity: 0.3`}
`;
const Buttons = () => {
  const colors = useContext(ThemeContext);
  const dispatch = useContext(DispatchContext);
  const { mute, isPlaying } = useContext(StateContext);
  return (
    <Container>
      <ButtonWrapper colors={colors}>
        <WrapperButton title={TOGGLE_PLAY} onClick={() => dispatch({ type: TOGGLE_PLAY })}>
          <StyledSvg color={colors.green} svg={isPlaying ? Pause : Play} />
        </WrapperButton>
        <WrapperButton title={RANDOM_BOARD} onClick={() => dispatch({ type: RANDOM_BOARD })}>
          <StyledSvg color={colors.border} svg={Random} />
        </WrapperButton>
        <WrapperButton title={CLEAR_BOARD} onClick={() => dispatch({ type: CLEAR_BOARD })}>
          <StyledSvg color={colors.red} svg={Clear} />
        </WrapperButton>
        <WrapperButton title={MUTE_SOUND} onClick={() => dispatch({ type: MUTE_SOUND })}>
          <StyledSvg color={colors.blue} muted={mute} svg={Note} />
        </WrapperButton>
        <WrapperButton title={TOGGLE_SETTINGS} onClick={() => dispatch({ type: TOGGLE_SETTINGS })}>
          <StyledSvg color={colors.grey} svg={Settings} />
        </WrapperButton>
      </ButtonWrapper>
      <SpeedSlider responsive shadows />
    </Container>
  );
};
export default Buttons;
