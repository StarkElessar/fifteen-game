import { generateMatrix } from './helpers/generateMatrix'
import { renderCell } from './helpers/renderCell'
import { setPositionItems } from './helpers/setPositionItems'
import { findElementPosition } from './helpers/findElementPosition'
import { swapElements } from './helpers/swapElements'
import { moveClickedElement } from './helpers/moveClickedElement'

export const createGame = () => {
  const settingsContainer = document.getElementById('settings')
  const settingButtons = settingsContainer.querySelectorAll('.settings__btn')
  let matrix

  settingsContainer.addEventListener('click', (event) => {
    const settingButton = event.target.closest('button')
    const indexSetBoard = Number(settingButton.dataset.size)

    matrix = generateMatrix(indexSetBoard)
    renderCell(matrix.flat(), board, indexSetBoard)
    setPositionItems(matrix)
    settingButtons.forEach(btn => {
      btn.classList.remove('_active')
    });
    document.querySelector(`[data-size="${indexSetBoard}"]`).classList.add('_active')
  })


  const frameDimensions = [3, 4, 5, 6, 7, 8]
  const defaultFrameDimension = frameDimensions[1]
  const currentFrameDimension = defaultFrameDimension
  const board = document.getElementById('board')
  matrix = generateMatrix(currentFrameDimension)

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
