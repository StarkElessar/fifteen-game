export const isSolvable = (arr) => {
  let countInversions = 0
  
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] && arr[i] && arr[i] > arr[j]) {
        countInversions++
      }
    }
  }
  console.log('countInversions: ', countInversions);
  return countInversions % 2 === 0
}