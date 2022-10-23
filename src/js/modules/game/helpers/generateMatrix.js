import { getShuffledRange } from './getShuffledRange'

export const generateMatrix = (dimension) => {
  const shuffledRange = getShuffledRange(dimension ** 2)
  const addRow = (_, i) =>
    shuffledRange.slice(i * dimension, (i + 1) * dimension)

  return [...Array(dimension)].map(addRow)
}
