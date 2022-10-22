export const generateRandomNumber = (max) => Math.floor(Math.random() * max)

export const getShuffledRange = (length) =>
  Array.from({ length }, (_, i) => i || null).sort(() => Math.random() - 0.5)

export const generateMatrix = (dimension) => {
  const shuffledRange = getShuffledRange(dimension ** 2)
  const addRow = (_, i) =>
    shuffledRange.slice(i * dimension, (i + 1) * dimension)

  return [...Array(dimension)].map(addRow)
}

export const findEmptyElementPosition = (matrix) => {
  const rowIndex = matrix.findIndex((row) => row.includes(null))
  const columnIndex = matrix[rowIndex].indexOf(null)

  return [rowIndex, columnIndex]
}

export const equals = (a, b) => a.every((element, i) => element === b[i])

export const isAbleToMove = (
  [clickedRowIndex, clickedColIndex],
  [emptyRowIndex, emptyColIndex]
) => {
  const movementConditionDeltas = [
    [0, 1],
    [1, 0],
  ]
  const positionDelta = [
    Math.abs(clickedRowIndex - emptyRowIndex),
    Math.abs(clickedColIndex - emptyColIndex),
  ]

  return movementConditionDeltas.some((conditionDelta) =>
    equals(conditionDelta, positionDelta)
  )
}

export const swapElements = (
  matrix,
  [clickedRowIndex, clickedColIndex],
  [emptyRowIndex, emptyColIndex]
) => {
  const newMatrix = [...matrix.map((row) => [...row])]

  ;[
    newMatrix[emptyRowIndex][emptyColIndex],
    newMatrix[clickedRowIndex][clickedColIndex],
  ] = [
    newMatrix[clickedRowIndex][clickedColIndex],
    newMatrix[emptyRowIndex][emptyColIndex],
  ]

  return newMatrix
}

export const moveClickedElement = (matrix, clickedElementPosition) => {
  const emptyElementPosition = findEmptyElementPosition(matrix)

  return isAbleToMove(clickedElementPosition, emptyElementPosition)
    ? swapElements(matrix, clickedElementPosition, emptyElementPosition)
    : matrix
}
