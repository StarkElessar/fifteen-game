export const swapElements = (matrix, [clickedRowIndex, clickedColIndex], [emptyRowIndex, emptyColIndex]) => {
  const newMatrix = [...matrix.map((row) => [...row])];

  [
    newMatrix[emptyRowIndex][emptyColIndex],
    newMatrix[clickedRowIndex][clickedColIndex],
  ] = [
    newMatrix[clickedRowIndex][clickedColIndex],
    newMatrix[emptyRowIndex][emptyColIndex],
  ]

  return newMatrix
}