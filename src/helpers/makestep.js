function makeStep(board) {
  const numberOfRows = board.length;
  const numberOfCols = board[0].length;
  let aliveCells = [];
  let newBoard = new Array(numberOfRows)
    .fill(false)
    .map(() => new Array(numberOfCols).fill(false));
  for (let i = 0; i < numberOfRows; i++) {
    for (let j = 0; j < numberOfCols; j++) {
      const neighbours = countNeighbours(i, j);
      if (board[i][j]) {
        if (neighbours < 2 || neighbours > 3) {
          newBoard[i][j] = false;
        } else {
          newBoard[i][j] = true;
        }
      } else {
        if (neighbours === 3) {
          newBoard[i][j] = true;
        } else {
          newBoard[i][j] = false;
        }
      }
    }
  }
  function countNeighbours(row, col) {
    let counter = 0;
    for (let i = row - 1; i < row + 2; i++) {
      for (let j = col - 1; j < col + 2; j++) {
        let wrappedI;
        if (i < 0) {
          wrappedI = numberOfRows - 1;
        } else if (i === numberOfRows) {
          wrappedI = 0;
        } else {
          wrappedI = i;
        }
        let wrappedJ;
        if (j < 0) {
          wrappedJ = numberOfCols - 1;
        } else if (j === numberOfCols) {
          wrappedJ = 0;
        } else {
          wrappedJ = j;
        }
        if (counter > 4) {
          break;
        } else {
          if (board[wrappedI][wrappedJ]) {
            counter++;
          }
        }
      }
    }
    if (board[row][col]) {
      counter--;
      aliveCells.push([row, col]);
    }
    return counter;
  }
  return [newBoard, aliveCells];
}
export default makeStep;
