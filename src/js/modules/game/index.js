import { fifteenCellHTML } from './helpers/fifteenCellHTML'
import {
  generateRandomNumber,
  getShuffledRange,
  generateMatrix,
  equals,
  isAbleToMove,
  swapElements,
  moveClickedElement,
  findElementPosition,
  renderCell,
  setPositionItems,
} from './helpers'

export const createGame = () => {
  const frameDimensions = [3, 4, 5, 6, 7, 8]
  const defaultFrameDimension = frameDimensions[1]
  const currentFrameDimension = defaultFrameDimension
  const board = document.getElementById('board')
  let matrix = generateMatrix(currentFrameDimension)
  console.log(matrix)

  renderCell(matrix.flat(), board)
  setPositionItems(matrix)

  document.getElementById('shuffle-start').addEventListener('click', () => {
    const startTime = new Date()
    console.log(startTime)
    matrix = generateMatrix(currentFrameDimension)

    renderCell(matrix.flat(), board)
    setPositionItems(matrix)
  })
  board.addEventListener('click', (event) => {
    const buttonNode = event.target.closest('button')
    const buttonNumber = JSON.parse(buttonNode.dataset.id)

    if (!buttonNode) return

    const clickedElementPosition = findElementPosition(matrix, buttonNumber)
    matrix = moveClickedElement(matrix, clickedElementPosition)

    setPositionItems(matrix)
  })
  window.addEventListener('keydown', (event) => {
    if (!event.key.includes('Arrow')) return

    let [emptyCellY, emptyCellX] = findElementPosition(matrix)

    const direction = event.key.split('Arrow')[1].toLowerCase()
    const maxIndexMatrix = matrix.length

    switch (direction) {
      case 'up':
        emptyCellY += 1
        console.log('up\ny: ', emptyCellY)
        break
      case 'down':
        emptyCellY -= 1
        console.log('down\ny: ', emptyCellY)
        break
      case 'left':
        emptyCellX += 1
        console.log('left\nx: ', emptyCellX)
        break
      case 'right':
        emptyCellX -= 1
        console.log('right\nx: ', emptyCellX)
        break
    }

    if (
      emptyCellY >= maxIndexMatrix ||
      emptyCellY < 0 ||
      emptyCellX >= maxIndexMatrix ||
      emptyCellX < 0
    ) {
      return
    }

    const swapedElementPosition = findElementPosition(matrix)
    matrix = swapElements(matrix, swapedElementPosition, [
      emptyCellY,
      emptyCellX,
    ])
    setPositionItems(matrix)
  })
}
