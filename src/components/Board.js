import React from "react";
import styled from "styled-components";
import sizeMe from "react-sizeme";

const BoardWrapper = styled.div`
  width: 100%;
  height: 60vh;
  @media screen and (orientation: landscape) {
    height: 69vh;
  }

  margin: 0 auto 0 auto;
`;
const StyledTable = styled.table`
  margin: auto;
  width: ${({ boardWidth }) => `${boardWidth}%`};
  opacity: 0.5;
  border-collapse: collapse;
  border-spacing: 0px;
`;
const StyledTd = styled.td`
  border: 1px solid black;
  width: ${({ boardWidth, cols }) => `${boardWidth / cols}vw`};
  height: ${({ boardWidth, cols }) => `${boardWidth / cols}vw`};
  box-sizing: border-box;
  opacity: ${({ column, highlightedColumn }) =>
    column === highlightedColumn ? "0.5" : "1"};
  background-color: ${({ active }) => (active ? "rgba(0,0,0,0)" : "black")};
  &:hover {
    opacity: 0.5;
  }
`;
class Board extends React.Component {
  render() {
    const numberOfRows = this.props.board.length;
    const numberOfCols = this.props.board[0].length;

    const GenerateRows = () =>
      [...Array(numberOfRows).keys()].map(rowIndex => (
        <tr key={rowIndex} row={rowIndex}>
          <GenerateColumns rowkey={rowIndex} />
        </tr>
      ));

    const GenerateColumns = props =>
      [...Array(numberOfCols).keys()].map(columnIndex => (
        <StyledTd
          boardWidth={this.props.boardWidth}
          key={`${props.rowkey}x${columnIndex}`}
          cols={numberOfCols}
          column={columnIndex}
          active={this.props.board[props.rowkey][columnIndex] ? true : false}
          highlightedColumn={this.props.highlightedColumn}
          onMouseDown={() => {
            this.props.handleClick("down");
            this.props.clickCell(props.rowkey, columnIndex);
          }}
          onMouseUp={() => this.props.handleClick("up")}
          onMouseEnter={() => {
            if (this.props.mousedown) {
              this.props.clickCell(props.rowkey, columnIndex);
            }
          }}
        />
      ));

    return (
      <BoardWrapper>
        <StyledTable boardWidth={this.props.boardWidth}>
          <tbody>
            <GenerateRows />
          </tbody>
        </StyledTable>
      </BoardWrapper>
    );
  }
}
export default sizeMe({ monitorHeight: true })(Board);
