import React from "react"
import styled from "styled-components"
import sizeMe from "react-sizeme"
import { sizes } from "../utils/sizes.js"

const BoardWrapper = styled.div`
  width: ${sizes.boardWidth};
  height: 70vh;
  margin: 0 ${sizes.boardMargin} 0 ${sizes.boardMargin};
`
const StyledTable = styled.table`
  width: 100%;
  background-color: black;
  border: 1px solid purple;
  border-collapse: collapse;
  border-spacing: 0px;
`
const StyledTd = styled.td`
  border: 1px solid purple;
  width: ${props => `${96 / props.cols}vw`};
  height: ${props => `${96 / props.cols}vw`};
  box-sizing: border-box;
  background-color: ${props => (props.active ? "purple" : "black")};
`
class Board extends React.Component {
  render() {
    const numberOfRows = this.props.board.length
    const numberOfCols = this.props.board[0].length

    const GenerateRows = () =>
      [...Array(numberOfRows).keys()].map(value => (
        <tr key={value}>
          <GenerateColumns rowkey={value} />
        </tr>
      ))

    const GenerateColumns = props =>
      [...Array(numberOfCols).keys()].map(value => (
        <StyledTd
          key={`${props.rowkey}x${value}`}
          cols={numberOfCols}
          active={this.props.board[props.rowkey][value] ? true : false}
          onMouseDown={() => {
            this.props.handleClick()
            this.props.clickCell(props.rowkey, value)
          }}
          onMouseUp={() => this.props.handleClick()}
          onMouseEnter={() => {
            if (this.props.mousedown) {
              this.props.clickCell(props.rowkey, value)
            }
          }}
        />
      ))

    return (
      <BoardWrapper>
        <StyledTable>
          <tbody>
            <GenerateRows />
          </tbody>
        </StyledTable>
      </BoardWrapper>
    )
  }
}
export default sizeMe({ monitorHeight: true })(Board)
