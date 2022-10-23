import { setNodeStyles } from './setNodeStyles'

export const setPositionItems = (matrix) => {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const node = document.querySelector(`[data-id="${matrix[y][x]}"]`)
      setNodeStyles(node, x, y)
    }
  }
}