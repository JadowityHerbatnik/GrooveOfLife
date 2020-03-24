import styled from "styled-components";
import React from "react";

const StyledTable = styled.table`
  margin: 10px;
  // background-color: rgba(0, 0, 0, 0.5);
  border-collapse: collapse;
  border-spacing: 0px;
  opacity: 0.5;
`;
const StyledTd = styled.td`
  @media (orientation: landscape) {
    width: 5vh;
    height: 5vh;
  }
  width: 7vmin;
  height: 7vmin;
  border: 2px solid black;
  // opacity: 0.2;
  background-color: ${({ ifActive }) => (ifActive ? "white" : "transparent")};
`;

const GenerateColumns = (numberOfCols, rowIndex, props) =>
  [...Array(numberOfCols).keys()].map(columnIndex => {
    const cellNumber = rowIndex * 3 + columnIndex;
    const ifActive = props.active.includes(cellNumber);
    return (
      <StyledTd
        key={`${rowIndex}x${columnIndex}`}
        index={cellNumber}
        ifActive={ifActive}
      />
    );
  });
const GenerateTable = (numberOfRows, numberOfCols, props) =>
  [...Array(numberOfRows).keys()].map(rowIndex => (
    <tr key={rowIndex}>{GenerateColumns(numberOfCols, rowIndex, props)}</tr>
  ));
export const Table = props => (
  <StyledTable>
    <tbody>{GenerateTable(3, 3, props)}</tbody>
  </StyledTable>
);
