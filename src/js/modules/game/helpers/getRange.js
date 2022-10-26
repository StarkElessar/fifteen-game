export const getRange = (length) => {
  console.log('getRange: length', length);
  const arr = Array.from({ length }, (_, i) => ++i)
    .slice(0, -1)
    .concat([0])

    console.log('getRange: \n', arr);
  
  return arr 
}
