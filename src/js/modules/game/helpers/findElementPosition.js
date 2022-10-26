export const findElementPosition = (matrix, number = 0) => {
  const rowIndex = matrix.findIndex((row) => row.includes(number))
  const columnIndex = matrix[rowIndex].indexOf(number)

  return [rowIndex, columnIndex]
}