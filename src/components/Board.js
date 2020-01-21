import React from "react"
import styled from "styled-components"
import sizeMe from "react-sizeme"
import { sizes } from "../utils/sizes.js"

const BoardWrapper = styled.div`
  width: ${sizes.boardWidth};
  height: 70vh;
  margin: 0 ${sizes.boardMargin} 0 ${sizes.boardMargin};
  // width: 100vh;
  // margin: 0;
`
const StyledTable = styled.table`
  width: 100%;
  background-color: black;
  border: 1px solid purple;
  border-collapse: collapse;
  border-spacing: 0px;
`
const StyledTr = styled.tr``
const StyledTd = styled.td`
  border: 1px solid purple;
  width: ${props => `${96 / props.numberOfColumns}vw`};
  height: ${props => `${96 / props.numberOfColumns}vw`};
  box-sizing: border-box;
`
const GenerateRows = props => {
  const numberOfRows = props.rows
  let rows = []
  for (let i = 0; i < numberOfRows; i++) {
    rows.push(
      <StyledTr key={i}>
        <GenerateColumns rowkey={i} columns={props.columns} />
      </StyledTr>
    )
  }
  return rows
}
const GenerateColumns = props => {
  const numberOfColumns = props.columns
  let columns = []
  for (let i = 0; i < numberOfColumns; i++) {
    columns.push(
      <StyledTd
        key={`row${props.rowkey}col${i}`}
        numberOfColumns={props.columns}
      />
    )
  }
  return columns
}
const Table = props => {
  return (
    <StyledTable>
      <tbody>
        <GenerateRows rows={props.rows} columns={props.columns} />
      </tbody>
    </StyledTable>
  )
}
function getBoardSize({ width, height }, bottomlimit, upperlimit) {
  let numberOfCols = Math.ceil(width / upperlimit)
  let numberOfRows = Math.ceil(height / upperlimit)
  return { cols: numberOfCols, rows: numberOfRows }
}
class Board extends React.Component {
  render() {
    let { cols, rows } = getBoardSize(this.props.size, 40, 50)
    const { width, height } = this.props.size
    return (
      <BoardWrapper>
        <Table rows={rows} columns={cols} />
      </BoardWrapper>
    )
  }
}
export default sizeMe({ monitorHeight: true })(Board)
