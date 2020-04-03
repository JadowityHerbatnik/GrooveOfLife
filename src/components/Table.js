import styled from "styled-components";
import React from "react";
import { colors } from "../utils/constants.js";
const { white } = colors;

const StyledTable = styled.table`
  margin: 10px;
  // background-color: rgba(0, 0, 0, 0.5);
  border-collapse: collapse;
  border-spacing: 0px;
  opacity: 0.7;
`;
const StyledTd = styled.td`
  @media (orientation: landscape) {
    width: 5vh;
    height: 5vh;
  }
  width: 8vmin;
  height: 8vmin;
  border: 2px solid black;
  background-color: ${({ ifActive }) => (ifActive ? white : "transparent")};
`;

const GenerateColumns = (numberOfCols, rowIndex, active) =>
  [...Array(numberOfCols).keys()].map((columnIndex) => {
    const cellNumber = rowIndex * numberOfCols + columnIndex;
    const ifActive = active.includes(cellNumber);
    return <StyledTd key={`${rowIndex}x${columnIndex}`} index={cellNumber} ifActive={ifActive} />;
  });
const GenerateTable = (numberOfRows, numberOfCols, active) =>
  [...Array(numberOfRows).keys()].map((rowIndex) => (
    <tr key={rowIndex}>{GenerateColumns(numberOfCols, rowIndex, active)}</tr>
  ));
export const Table = ({ size = [3, 3], active = [] }) => (
  <StyledTable>
    <tbody>{GenerateTable(size[0], size[1], active)}</tbody>
  </StyledTable>
);
