import React from "react";
import styled from "styled-components";
import sizeMe from "react-sizeme";
import { sizes } from "../utils/sizes.js";

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
  width: ${props => `${props.boardWidth}%`};
  opacity: 0.5;
  background-color: transparent;
  border-collapse: collapse;
  border-spacing: 0px;
`;
const StyledTd = styled.td`
  border: 1px solid black;
  width: ${props => `${props.boardWidth / props.cols}vw`};
  height: ${props => `${props.boardWidth / props.cols}vw`};
  box-sizing: border-box;
  background-color: ${props => (props.active ? "rgba(0,0,0,0)" : "black")};
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
        <tr key={rowIndex}>
          <GenerateColumns rowkey={rowIndex} />
        </tr>
      ));

    const GenerateColumns = props =>
      [...Array(numberOfCols).keys()].map(columnIndex => (
        <StyledTd
          boardWidth={this.props.boardWidth}
          key={`${props.rowkey}x${columnIndex}`}
          cols={numberOfCols}
          active={this.props.board[props.rowkey][columnIndex] ? true : false}
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
