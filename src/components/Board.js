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
  width: ${props => `${96 / props.numberOfColumns}vw`};
  height: ${props => `${96 / props.numberOfColumns}vw`};
  box-sizing: border-box;
`
const GenerateRows = props => {
  const numberOfRows = props.dimensions.rows
  let rows = []
  for (let i = 0; i < numberOfRows; i++) {
    rows.push(
      <tr key={i}>
        <GenerateColumns rowkey={i} cols={props.dimensions.cols} />
      </tr>
    )
  }
  return rows
}
const GenerateColumns = props => {
  const numberOfColumns = props.cols
  let columns = []
  for (let i = 0; i < numberOfColumns; i++) {
    columns.push(
      <StyledTd
        key={`row${props.rowkey}col${i}`}
        numberOfColumns={numberOfColumns}
      />
    )
  }
  return columns
}
const Table = props => {
  return (
    <StyledTable>
      <tbody>
        <GenerateRows dimensions={props.dimensions} />
      </tbody>
    </StyledTable>
  )
}
class Board extends React.Component {
  render() {
    return (
      <BoardWrapper>
        <Table dimensions={this.props.dimensions} />
      </BoardWrapper>
    )
  }
}
export default sizeMe({ monitorHeight: true })(Board)
