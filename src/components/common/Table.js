import styled from "styled-components";
import React from "react";
import { color_themes } from "@utils/constants.js";
const { white } = color_themes.solarized;

const StyledTable = styled.table`
  border-collapse: collapse;
  border-spacing: 0px;
  opacity: 0.7;
`;
const StyledTd = styled.td`
  width: 1.5em;
  height: 1.5em;
  @media (orientation: landscape) {
    width: 5vh;
    height: 5vh;
  }
  border: 2px solid black;
  background-color: ${({ color }) => (color ? color : "transparent")};
`;

const GenerateColumns = (numberOfCols, rowIndex, active, color) =>
  [...Array(numberOfCols).keys()].map((columnIndex) => {
    const cellNumber = rowIndex * numberOfCols + columnIndex;
    const ifActive = active.includes(cellNumber);
    const cellColor = color.hasOwnProperty(cellNumber) ? color[cellNumber] : "";

    return (
      <StyledTd
        key={`${rowIndex}x${columnIndex}`}
        index={cellNumber}
        color={ifActive ? white : cellColor}
      />
    );
  });
const GenerateTable = (numberOfRows, numberOfCols, active, color) =>
  [...Array(numberOfRows).keys()].map((rowIndex) => (
    <tr key={rowIndex}>{GenerateColumns(numberOfCols, rowIndex, active, color)}</tr>
  ));
export const Table = ({ size = [3, 3], active = [], color = [] }) => (
  <StyledTable>
    <tbody>{GenerateTable(size[0], size[1], active, color)}</tbody>
  </StyledTable>
);
