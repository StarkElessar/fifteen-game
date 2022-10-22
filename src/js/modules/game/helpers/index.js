import { fifteenCellHTML } from './fifteenCellHTML'

export const generateRandomNumber = (max) => Math.floor(Math.random() * max)

export const getShuffledRange = (length) =>
  Array.from({ length }, (_, i) => i || null).sort(() => Math.random() - 0.5)

export const generateMatrix = (dimension) => {
  const shuffledRange = getShuffledRange(dimension ** 2)
  const addRow = (_, i) =>
    shuffledRange.slice(i * dimension, (i + 1) * dimension)

  return [...Array(dimension)].map(addRow)
}

export const findElementPosition = (matrix, number = null) => {
  const rowIndex = matrix.findIndex((row) => row.includes(number))
  const columnIndex = matrix[rowIndex].indexOf(number)

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

export const moveClickedElement = (matrix, clickedElementPosition) => {
  const emptyElementPosition = findElementPosition(matrix)

  return isAbleToMove(clickedElementPosition, emptyElementPosition)
    ? swapElements(matrix, clickedElementPosition, emptyElementPosition)
    : matrix
}

export const renderCell = (arr, container, currentSize = 4) => {
  container.innerHTML = ''

  arr.forEach((items) => {
    container.insertAdjacentHTML('beforeend', fifteenCellHTML(items))
  })

  const itemsCell = container.querySelectorAll('.board__item')

  itemsCell.forEach((item) => {
    item.style.width = `${100 / currentSize}%`
    item.style.height = `${100 / currentSize}%`
  });
}

export const setPositionItems = (matrix) => {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const node = document.querySelector(`[data-id="${matrix[y][x]}"]`)
      setNodeStyles(node, x, y)
    }
  }
}

export const setNodeStyles = (node, x, y) => {
  const shiftPs = 100

  node.style.transform = `translate(${x * shiftPs}%, ${y * shiftPs}%)`
  if (node.dataset.id === 'null') {
    node.classList.add('_hide')
  }
}