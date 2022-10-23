import { findElementPosition } from './findElementPosition'
import { isAbleToMove } from './isAbleToMove'
import { swapElements } from './swapElements'

export const moveClickedElement = (matrix, clickedElementPosition) => {
  const emptyElementPosition = findElementPosition(matrix)

  return isAbleToMove(clickedElementPosition, emptyElementPosition)
    ? swapElements(matrix, clickedElementPosition, emptyElementPosition)
    : matrix
}