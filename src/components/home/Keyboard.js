import React, { useContext } from "react";
import styled from "styled-components";
import { DispatchContext, StateContext } from "@home/Game";
import { ThemeContext } from "@common/Layout";
import { keyboard } from "@utils/constants";
import { SET_SCALE } from "@reducer/action-types";
import { FlexBox, StyledLabel } from "@common/Generic";

const { keyMargin, blackWidth, blackHeight, whiteHeight, whiteWidth } = keyboard;

const isBlack = (keyIndex) => {
  const blackKeysIndexes = [1, 3, 6, 8, 10];
  return blackKeysIndexes.includes(keyIndex);
};

const KeysButtons = (props) =>
  [...Array(12).keys()].map((keyIndex) => (
    <NoteButtons
      colors={props.colors}
      key={keyIndex}
      isBlack={isBlack(keyIndex)}
      note={keyIndex}
      isNoteUsed={props.scale[keyIndex]}
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

export const Keyboard = () => {
  const { scale } = useContext(StateContext);
  const colors = useContext(ThemeContext);
  const dispatch = useContext(DispatchContext);
  return (
    <>
      <StyledLabel color={colors.grey}>Notes to use:</StyledLabel>
      <FlexBox row align="flex-start" style={{ margin: "10px" }}>
        <KeysButtons colors={colors} scale={scale} dispatch={dispatch} />
      </FlexBox>
    </>
  );
};
