import { equals } from './equals'

export const isAbleToMove = ([clickedRowIndex, clickedColIndex], [emptyRowIndex, emptyColIndex]) => {
  const movementConditionDeltas = [ [0, 1], [1, 0]]
  const positionDelta = [
    Math.abs(clickedRowIndex - emptyRowIndex),
    Math.abs(clickedColIndex - emptyColIndex),
  ]

  return movementConditionDeltas.some((conditionDelta) =>
    equals(conditionDelta, positionDelta)
  )
}