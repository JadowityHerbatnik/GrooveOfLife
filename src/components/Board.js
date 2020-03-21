import React from "react";
import styled from "styled-components";
import { sizes } from "../utils/constants.js";
import { SlideFromBottom } from "../styles/animations.js";

const BoardWrapper = styled.div`
  height: 90%;
  width: 90%;
  @media screen and (orientation: portrait) {
    // Decreased height on mobile devices to avoid scrollbar and weird interactions with bars
    // height: 60vh;
    height: 90%;
    width: 95%;
  }
  // margin: 0 auto 0 auto;
  margin: 0;
`;
const StyledTable = styled.table`
  margin: auto;
  opacity: 0.5;
  border-collapse: collapse;
  border-spacing: 0px;
  animation: 0.5s ease 0.5s 1 both ${SlideFromBottom};
`;
const StyledTd = styled.td`
  border: 1px solid black;
  width: ${({ cellSize }) => `${cellSize}px`};
  height: ${({ cellSize }) => `${cellSize}px`};
  box-sizing: border-box;
  opacity: ${({ column, highlightedColumn }) =>
    column === highlightedColumn ? "0.5" : "1"};
  background-color: ${({ active }) => (active ? "rgba(0,0,0,0)" : "black")};
  &:hover {
    opacity: 0.5;
  }
`;
const GenerateColumns = props =>
  [...Array(props.numberOfCols).keys()].map(columnIndex => (
    <StyledTd
      cellSize={sizes.preferredCellSize}
      key={`${props.rowIndex}x${columnIndex}`}
      cols={props.numberOfCols}
      column={columnIndex}
      active={props.forwardedProps.board[props.rowIndex][columnIndex] ? true : false}
      highlightedColumn={props.forwardedProps.highlightedColumn}
      onMouseDown={() => {
        props.forwardedProps.handleClick("down");
        props.forwardedProps.clickCell(props.rowIndex, columnIndex);
      }}
      onMouseUp={() => props.forwardedProps.handleClick("up")}
      onMouseEnter={() => {
        if (props.forwardedProps.mousedown) {
          props.forwardedProps.clickCell(props.rowIndex, columnIndex);
        }
      }}
    />
  ));
const Board = React.forwardRef((props, ref) => {
  const numberOfRows = props.board.length;
  const numberOfCols = props.board[0].length;

  const GenerateRows = numberOfRows =>
    [...Array(numberOfRows).keys()].map(rowIndex => (
      <tr key={rowIndex} row={rowIndex}>
        <GenerateColumns
          rowIndex={rowIndex}
          forwardedProps={props}
          numberOfCols={numberOfCols}
        />
      </tr>
    ));

  return (
    <BoardWrapper ref={ref}>
      <StyledTable>
        <tbody>{GenerateRows(numberOfRows)}</tbody>
      </StyledTable>
    </BoardWrapper>
  );
});

export default Board;
