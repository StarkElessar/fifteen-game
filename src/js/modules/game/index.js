import { generateMatrix } from './helpers/generateMatrix'
import { renderCell } from './helpers/renderCell'
import { setPositionItems } from './helpers/setPositionItems'
import { findElementPosition } from './helpers/findElementPosition'
import { swapElements } from './helpers/swapElements'
import { moveClickedElement } from './helpers/moveClickedElement'
import { isAbleToMove } from './helpers/isAbleToMove'
import { saveResults } from './helpers/saveResults'
import { disabledButtoncurrentSet } from './helpers/disabledButtoncurrentSet'
import { itemScoreHTML } from '../../components/itemScoreHTML'
import { getLC } from './helpers/getLC'
import { timer } from './../timer'

export const createGame = () => {
  const scoreModal = document.getElementById('score-modal')
  const scoreList = scoreModal.querySelector('#score-list')
  const navigationMenu = document.getElementById('menu')
  const board = document.getElementById('board')
  const settingsContainer = document.getElementById('settings')
  const settingButtons = settingsContainer.querySelectorAll('.settings__btn')
  const placeCount = document.getElementById('count')
  const placeMinutes = document.getElementById('minutes')
  const placeSeconds = document.getElementById('seconds')

  const statistic = getLC('resultList') || new Array()
  const isShuffled = true
  const timeObject = {
    minutes: getLC('saveGame') ? getLC('saveGame').minutes : 0,
    seconds: getLC('saveGame') ? getLC('saveGame').seconds : 0,
  }
  
  let interval
  let startTime = 0
  let idGame = statistic.length || 0
  let currentFrameDimension = getLC('saveGame') ? getLC('saveGame').currentSize : 4
  
  console.log('start: ', currentFrameDimension);
  
  let matrix = getLC('saveGame') ? getLC('saveGame').matrix : generateMatrix(currentFrameDimension)
  let trueMatrix = generateMatrix(currentFrameDimension)
  let clickCount = getLC('saveGame') ? getLC('saveGame').clickCount : 0

  placeCount.innerHTML = clickCount

  renderCell(matrix.flat(), board, currentFrameDimension)
  setPositionItems(matrix)

  if (getLC('saveGame')) {
    disabledButtoncurrentSet(settingButtons, currentFrameDimension, board, isShuffled)

    interval = setInterval(() => {
      timer(placeMinutes, placeSeconds, timeObject)
    }, 1000)
  } else {
    disabledButtoncurrentSet(settingButtons, currentFrameDimension, board)
  }

  navigationMenu.addEventListener('click', (event) => {
    const target = event.target

    if (target && target.id === 'shuffle-start') {
      clickCount = 0
      placeCount.innerHTML = clickCount
      console.log('shuffle-start: ', currentFrameDimension);
      matrix = generateMatrix(currentFrameDimension, isShuffled)
      startTime = Date.parse(new Date())
      board.classList.remove('_lock')
      
      if (board.classList.contains('_win')) { 
        board.classList.remove('_win')
      }

      localStorage.removeItem('saveGame')

      setPositionItems(matrix)

      clearInterval(interval)
      timeObject.minutes = 0
      timeObject.seconds = 0
      interval = setInterval(() => {
        timer(placeMinutes, placeSeconds, timeObject)
      }, 1000)
    }

    if (target && target.id === 'save-process') {
      localStorage.setItem('saveGame', JSON.stringify({
        matrix,
        currentSize: currentFrameDimension,
        clickCount,
        minutes: timeObject.minutes,
        seconds: timeObject.seconds
      }))
      
      alert('Ваша игра успешно сохранена!')
    }

    if (target && target.id === 'results') {
      const sortedStatistic = statistic.sort((a, b) => a.victoryTime - b.victoryTime).slice(0, 10)
      scoreList.innerHTML = ''
      sortedStatistic.forEach((item, index) => {
        scoreList.insertAdjacentHTML('beforeend', itemScoreHTML(item, index))
      })
      scoreModal.classList.add('_show')
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

      if (JSON.stringify(matrix) === JSON.stringify(trueMatrix)) {
        const minutes = timeObject.minutes <= 9 ? `0${timeObject.minutes}` : timeObject.minutes
        const seconds = timeObject.seconds <= 9 ? `0${timeObject.seconds}` : timeObject.seconds

        alert(`Ура, Ты решил головоломку за ${minutes}:${seconds} и ${clickCount} ходов!`)

        statistic[idGame] = saveResults(
          clickCount,
          minutes,
          seconds,
          Date.parse(new Date()) - startTime,
          currentFrameDimension
        )

        localStorage.setItem('resultList', JSON.stringify(statistic))

        idGame++
        clickCount = 0

        clearInterval(interval)
        timeObject.minutes = 0
        timeObject.seconds = 0

        board.classList.add('_lock', '_win')
      }
    }
  })
  settingsContainer.addEventListener('click', (event) => {
    const target = event.target

    if (target && target.hasAttribute('data-size')) {
      currentFrameDimension = Number(event.target.closest('button').dataset.size)
      trueMatrix = generateMatrix(currentFrameDimension)
      matrix = generateMatrix(currentFrameDimension)
      renderCell(matrix.flat(), board, currentFrameDimension)
      setPositionItems(matrix)
      disabledButtoncurrentSet(settingButtons, currentFrameDimension, board)

      clearInterval(interval)
      timeObject.minutes = 0
      timeObject.seconds = 0

      if (board.classList.contains('_win')) { 
        board.classList.remove('_win')
      }
    }
  })
  window.addEventListener('keydown', (event) => {
    if (!event.key.includes('Arrow')) return

    let [emptyCellY, emptyCellX] = findElementPosition(matrix)
    const direction = event.key.split('Arrow')[1].toLowerCase()

    switch (direction) {
      case 'up':
        emptyCellY += 1
        break
      case 'down':
        emptyCellY -= 1
        break
      case 'left':
        emptyCellX += 1
        break
      case 'right':
        emptyCellX -= 1
        break
    }

    if (emptyCellY >= matrix.length || emptyCellY < 0 || emptyCellX >= matrix.length || emptyCellX < 0) {
      return
    }

    const swapedElementPosition = findElementPosition(matrix)
    matrix = swapElements(matrix, swapedElementPosition, [emptyCellY, emptyCellX])
    setPositionItems(matrix)
    clickCount += 1
    placeCount.innerHTML = clickCount

    if (JSON.stringify(matrix) === JSON.stringify(trueMatrix)) {
      const minutes = timeObject.minutes <= 9 ? `0${timeObject.minutes}` : timeObject.minutes
      const seconds = timeObject.seconds <= 9 ? `0${timeObject.seconds}` : timeObject.seconds

      alert(`Ура, Ты решил головоломку за ${minutes}:${seconds} и ${clickCount} ходов!`)

      statistic[idGame] = saveResults(
        clickCount,
        minutes,
        seconds,
        Date.parse(new Date()) - startTime,
        currentFrameDimension
      )

      localStorage.setItem('resultList', JSON.stringify(statistic))

      idGame++
      clickCount = 0

      clearInterval(interval)
      timeObject.minutes = 0
      timeObject.seconds = 0

      board.classList.add('_lock _win')
    }
  })
  document.addEventListener('click', (event) => {
    const target = event.target

    if (target && (target.classList.contains('score') || target.closest('.score__button-close'))) {
      scoreModal.classList.remove('_show')
    }
  })
}
