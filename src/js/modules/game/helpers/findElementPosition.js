export const findElementPosition = (matrix, number = null) => {
  const rowIndex = matrix.findIndex((row) => row.includes(number))
  const columnIndex = matrix[rowIndex].indexOf(number)

  return [rowIndex, columnIndex]
}