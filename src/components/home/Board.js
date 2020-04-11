import React, { useContext } from "react";
import styled from "styled-components";
import { sizes } from "@utils/constants.js";
import { SlideFromBottom } from "@styles/animations.js";
import { ThemeContext } from "@common/Layout.js";
import { DispatchContext } from "@home/Game";

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
  border: ${({ colors }) => `1px solid ${colors.border}`};
  width: ${({ cellSize }) => `${cellSize}px`};
  height: ${({ cellSize }) => `${cellSize}px`};
  box-sizing: border-box;
  opacity: ${({ column, highlightedColumn }) => (column === highlightedColumn ? "0.5" : "1")};
  background-color: ${({ active, isPlaying, colors }) =>
    active ? (isPlaying ? colors.green : colors.border) : colors.background};
`;
const GenerateColumns = ({ rowIndex, numberOfCols, colors, props }) => {
  const dispatch = useContext(DispatchContext);
  return [...Array(numberOfCols).keys()].map((columnIndex) => (
    <StyledTd
      colors={colors}
      cellSize={sizes.preferredCellSize}
      isPlaying={props.isPlaying}
      key={`${rowIndex}x${columnIndex}`}
      cols={numberOfCols}
      column={columnIndex}
      active={props.board[rowIndex][columnIndex] ? true : false}
      highlightedColumn={props.highlightedColumn}
      onMouseDown={() => {
        if (props.isPlaying) {
          dispatch({ type: "suspend" });
        }
        dispatch({ type: "mouseDown", payload: true });
        dispatch({ type: "boardClick", coordinates: [rowIndex, columnIndex] });
      }}
      onMouseUp={() => {
        if (props.isSuspended) {
          dispatch({ type: "resume" });
        }
        dispatch({ type: "mouseDown", payload: false });
      }}
      onMouseEnter={() => {
        if (props.mousedown) {
          dispatch({ type: "boardClick", coordinates: [rowIndex, columnIndex] });
        }
      }}
    />
  ));
};
const GenerateTable = (numberOfRows, numberOfCols, colors, props) =>
  [...Array(numberOfRows).keys()].map((rowIndex) => (
    <tr key={rowIndex}>
      <GenerateColumns
        rowIndex={rowIndex}
        numberOfCols={numberOfCols}
        colors={colors}
        props={props}
      />
    </tr>
  ));
const Board = React.forwardRef((props, ref) => {
  const colors = useContext(ThemeContext);
  const numberOfRows = props.board.length;
  const numberOfCols = props.board[0].length;

  return (
    <BoardWrapper ref={ref}>
      <StyledTable colors={colors} isPlaying={props.isPlaying}>
        <tbody>{GenerateTable(numberOfRows, numberOfCols, colors, props)}</tbody>
      </StyledTable>
    </BoardWrapper>
  );
});

export default Board;
