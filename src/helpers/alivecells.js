export default function alivecells(board) {
  const X = board.length
  const Y = board[0].length
  let aliveCells = []
  for (let i = 0; i < X; i++) {
    for (let j = 0; j < Y; j++) {
      if (board[i][j]) {
        aliveCells.push([i, j])
      }
    }
  }
  return aliveCells
}
