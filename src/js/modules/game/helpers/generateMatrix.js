import { getRange } from './getRange'
import { getShuffledRange } from './getShuffledRange'

export const generateMatrix = (dimension, isShuffled = false) => {
  const createRange = isShuffled ? getShuffledRange : getRange
  const range = createRange(dimension ** 2)
  const addRow = (_, i) => range.slice(i * dimension, (i + 1) * dimension)

  return [...Array(dimension)].map(addRow)
}
