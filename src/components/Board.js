import React, { useContext } from "react";
import styled from "styled-components";
import { sizes, colors } from "../utils/constants.js";
import { SlideFromBottom } from "../styles/animations.js";
import { ThemeContext } from "../components/layout.js";

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
  opacity: 0.5;
  border: ${({ isPlaying, colors }) => `3px solid ${isPlaying ? colors.green : colors.border}`};
  border-collapse: collapse;
  border-spacing: 0px;
  animation: 0.5s ease 0.7s 1 both ${SlideFromBottom};
`;
const StyledTd = styled.td`
  border: 1px solid black;
  width: ${({ cellSize }) => `${cellSize}px`};
  height: ${({ cellSize }) => `${cellSize}px`};
  box-sizing: border-box;
  opacity: ${({ column, highlightedColumn }) => (column === highlightedColumn ? "0.5" : "1")};
  background-color: ${({ active, colors }) => (active ? colors.blue : "black")};
  // &:hover {
  //   opacity: 0.5;
  // }
`;
const GenerateColumns = (rowIndex, numberOfCols, colors, props) =>
  [...Array(numberOfCols).keys()].map((columnIndex) => (
    <StyledTd
      colors={colors}
      cellSize={sizes.preferredCellSize}
      key={`${rowIndex}x${columnIndex}`}
      cols={numberOfCols}
      column={columnIndex}
      active={props.board[rowIndex][columnIndex] ? true : false}
      highlightedColumn={props.highlightedColumn}
      onMouseDown={() => {
        if (props.isPlaying) {
          props.suspend();
        }
        props.handleClick("down");
        props.clickCell(rowIndex, columnIndex);
      }}
      onMouseUp={() => {
        if (props.isSuspended) {
          props.resume();
        }
        props.handleClick("up");
      }}
      onMouseEnter={() => {
        if (props.mousedown) {
          props.clickCell(rowIndex, columnIndex);
        }
      }}
    />
  ));
const GenerateTable = (numberOfRows, numberOfCols, colors, props) =>
  [...Array(numberOfRows).keys()].map((rowIndex) => (
    <tr key={rowIndex}>{GenerateColumns(rowIndex, numberOfCols, colors, props)}</tr>
  ));
const Board = React.forwardRef((props, ref) => {
  const colors = useContext(ThemeContext);
  // const { black, brblack, green, cyan, violet, grey, blue } = colors;
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
