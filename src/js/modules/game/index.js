import { generateMatrix } from './helpers/generateMatrix'
import { renderCell } from './helpers/renderCell'
import { setPositionItems } from './helpers/setPositionItems'
import { findElementPosition } from './helpers/findElementPosition'
import { swapElements } from './helpers/swapElements'
import { moveClickedElement } from './helpers/moveClickedElement'
import { isAbleToMove } from './helpers/isAbleToMove'

export const createGame = () => {
  const navigationMenu = document.getElementById('menu')
  const board = document.getElementById('board')
  const settingsContainer = document.getElementById('settings')
  const settingButtons = settingsContainer.querySelectorAll('.settings__btn')
  const stopButton = navigationMenu.querySelector('#stop-game')
  const placeCount = document.getElementById('count')
  const placeTime = document.getElementById('time')

  const resultStat = JSON.parse(localStorage.getItem('results')) || new Object()
  let clickCount = JSON.parse(localStorage.getItem('count')) || 0
  let status = false
  let currentFrameDimension = 4
  let matrix = JSON.parse(localStorage.getItem('setupMatrix')) || generateMatrix(currentFrameDimension)

  placeCount.innerHTML = clickCount

  renderCell(matrix.flat(), board)
  setPositionItems(matrix)

  navigationMenu.addEventListener('click', (event) => {
    const target = event.target
    let startTime = ''
    let stopTime = ''
    let resultTime = ''

    if (target && target.id === 'shuffle-start') {
      status = true
      clickCount = 0
      placeCount.innerHTML = clickCount
      matrix = generateMatrix(currentFrameDimension)

      localStorage.removeItem('setupMatrix')
      localStorage.removeItem('count')

      renderCell(matrix.flat(), board, currentFrameDimension)
      setPositionItems(matrix)

      startTime = new Date()

      if (status) {
        stopButton.removeAttribute('disabled')
      }

      console.log(resultStat)
    }

    if (target && target.id === 'stop-game') {
      stopButton.setAttribute('disabled', true)
      status = false
      stopTime = new Date()
      resultTime = stopTime - startTime

      resultStat[resultTime] = {}
      resultStat[resultTime]['Количество шагов'] = clickCount
      resultStat[resultTime]['Пройденное время'] = resultTime

      console.log(resultStat)
      localStorage.setItem('results', JSON.stringify(resultStat))

      clickCount = 0
      stopTime = 0
      startTime = 0
      resultTime = 0
    }

    if (target && target.id === 'results') {
      alert(JSON.stringify(resultStat))
    }

    if (target && target.id === 'save-process') {
      localStorage.setItem('setupMatrix', JSON.stringify(matrix))
      localStorage.setItem('count', JSON.stringify(clickCount))
    }
  })
  board.addEventListener('click', (event) => {
    const target = event.target
    const buttonNode = event.target.closest('button')

    if (target && buttonNode) {
      const buttonNumber = JSON.parse(buttonNode.dataset.id)
      const clickedElementPosition = findElementPosition(matrix, buttonNumber)
      const emptyElementPosition = findElementPosition(matrix)

      matrix = moveClickedElement(matrix, clickedElementPosition)
      setPositionItems(matrix)

      if (isAbleToMove(clickedElementPosition, emptyElementPosition)) {
        clickCount += 1
        placeCount.innerHTML = clickCount
      }
    }
  })
  settingsContainer.addEventListener('click', (event) => {
    const settingButton = event.target.closest('button')
    const indexSetBoard = Number(settingButton.dataset.size)
    const currentSettingButton = document.querySelector(`[data-size="${indexSetBoard}"]`)

    currentFrameDimension = indexSetBoard
    matrix = generateMatrix(currentFrameDimension)
    renderCell(matrix.flat(), board, currentFrameDimension)
    setPositionItems(matrix)

    settingButtons.forEach((btn) => {
      btn.classList.remove('_active')
      btn.removeAttribute('disabled')
    })
    currentSettingButton.classList.add('_active')
    currentSettingButton.setAttribute('disabled', true)
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
    clickCount += 1
    placeCount.innerHTML = clickCount
  })
  console.log(clickCount)
}
