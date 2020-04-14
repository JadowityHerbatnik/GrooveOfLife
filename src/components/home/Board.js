import React, { useContext } from "react";
import styled from "styled-components";
import { sizes } from "@utils/constants.js";
import { SlideFromBottom } from "@styles/animations.js";
import { ThemeContext } from "@common/Layout.js";
import { DispatchContext, StateContext } from "@home/Game";
import { CLICK_CELL, IS_MOUSEDOWN, SUSPEND, RESUME } from "@reducer/action-types";

const BoardWrapper = styled.div`
  height: 90%;
  width: 90%;
  @media screen and (orientation: portrait) {
    // Decreased height on mobile devices to avoid scrollbar and weird interactions with bars
    // height: 60vh;
    height: 80%;
    width: 100%;
  }
  // margin: 0 auto 0 auto;
  margin: 0;
`;
const StyledTable = styled.table`
  margin: auto;
  opacity: 0.75;
  border: ${({ isPlaying, colors }) => `3px solid ${isPlaying ? colors.green : colors.border}`};
  border-collapse: collapse;
  border-spacing: 0px;
  animation: 0.5s ease 0.7s 1 both ${SlideFromBottom};
`;
const StyledTd = styled.td`
  border: ${({ colors }) => `1px solid ${colors.black}`};
  width: ${({ cellSize }) => `${cellSize}px`};
  height: ${({ cellSize }) => `${cellSize}px`};
  box-sizing: border-box;
  opacity: ${({ column, activeColumn }) => (column === activeColumn ? "0.5" : "1")};
  background-color: ${({ active, isPlaying, colors }) =>
    active ? (isPlaying ? colors.green : colors.border) : colors.black};
`;
const GenerateColumns = ({ rowIndex, numberOfCols }) => {
  const dispatch = useContext(DispatchContext);
  const colors = useContext(ThemeContext);
  const { board, isPlaying, isMouseDown, isSuspended, activeColumn } = useContext(StateContext);
  return [...Array(numberOfCols).keys()].map((columnIndex) => (
    <StyledTd
      colors={colors}
      cellSize={sizes.preferredCellSize}
      isPlaying={isPlaying}
      key={`${rowIndex}x${columnIndex}`}
      cols={numberOfCols}
      column={columnIndex}
      active={board[rowIndex][columnIndex] ? true : false}
      activeColumn={activeColumn}
      onMouseDown={() => {
        if (isPlaying) {
          dispatch({ type: SUSPEND });
        }
        dispatch({ type: IS_MOUSEDOWN, payload: true });
        dispatch({ type: CLICK_CELL, coordinates: [rowIndex, columnIndex] });
      }}
      onMouseUp={() => {
        if (isSuspended) {
          dispatch({ type: RESUME });
        }
        dispatch({ type: IS_MOUSEDOWN, payload: false });
      }}
      onMouseEnter={() => {
        if (isMouseDown) {
          dispatch({ type: CLICK_CELL, coordinates: [rowIndex, columnIndex] });
        }
      }}
    />
  ));
};
const GenerateTable = (numberOfRows, numberOfCols) =>
  [...Array(numberOfRows).keys()].map((rowIndex) => (
    <tr key={rowIndex}>
      <GenerateColumns rowIndex={rowIndex} numberOfCols={numberOfCols} />
    </tr>
  ));
const Board = React.forwardRef((props, ref) => {
  const colors = useContext(ThemeContext);
  const { board, isPlaying } = useContext(StateContext);
  const numberOfRows = board.length;
  const numberOfCols = board[0].length;

  return (
    <BoardWrapper ref={ref}>
      <StyledTable colors={colors} isPlaying={isPlaying}>
        <tbody>{GenerateTable(numberOfRows, numberOfCols)}</tbody>
      </StyledTable>
    </BoardWrapper>
  );
});

export default Board;
