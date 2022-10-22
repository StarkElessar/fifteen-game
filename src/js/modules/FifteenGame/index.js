import {
  generateRandomNumber,
  getShuffledRange,
  generateMatrix,
  findEmptyElementPosition,
  equals,
  isAbleToMove,
  swapElements,
  moveClickedElement,
} from './helpers'

export default function Fifteen() {
  const frameDimensions = [3, 4, 5, 6, 7, 8]
  const defaultFrameDimension = frameDimensions[1]
  const currentFrameDimension = defaultFrameDimension

  const board = document.getElementById('board')
  let matrix = generateMatrix(currentFrameDimension)
  console.log(matrix)

  renderCell(matrix.flat())

  setPositionItems(matrix)

  document.getElementById('shuffle-start').addEventListener('click', () => {
    const startTime = new Date()
    console.log(startTime)
    matrix = generateMatrix(currentFrameDimension)

    renderCell(matrix.flat())
    setPositionItems(matrix)
  })

  board.addEventListener('click', (event) => {
    const buttonNode = event.target.closest('button')
    const buttonNumber = Number(buttonNode.dataset.id)
    console.log(buttonNumber);

    if (!buttonNode) return

    const clickedElementPosition = findCoordinatesByNumber(buttonNumber, matrix)
    matrix = moveClickedElement(matrix, clickedElementPosition)

    setPositionItems(matrix)
    console.log(matrix);
  })
}

export function setNodeStyles(node, x, y) {
  const shiftPs = 100
  node.style.transform = `translate(${x * shiftPs}%, ${y * shiftPs}%)`
  if (node.dataset.id === 'null') {
    node.style.display = 'none'
  }
}
export function setPositionItems(matrix) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const node = document.querySelector(`[data-id="${matrix[y][x]}"]`)
      setNodeStyles(node, x, y)
    }
  }
}
function renderCell(arr) {
  board.innerHTML = ''

  for (let i = 0; i < arr.length; i++) {
    const cell = document.createElement('button')

    cell.setAttribute('data-id', arr[i])
    cell.classList.add('board__item')
    cell.innerText = arr[i]

    board.append(cell)
  }
}
export function findCoordinatesByNumber(number, matrix) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === number) {
        console.log([y, x])
        return [y, x]
      }
    }
  }

  return null
}
