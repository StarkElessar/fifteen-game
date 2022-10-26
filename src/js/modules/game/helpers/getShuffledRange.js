import { getRange } from './getRange'
import { isSolvable } from './isSolvable'

export const getShuffledRange = (length) => {
  const sortedArray = getRange(length).sort(() => Math.random() - 0.5)
  
  console.log('getShuffledRange: \n', sortedArray);

  return isSolvable(sortedArray) ? sortedArray : getShuffledRange(length)
}