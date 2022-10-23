export const setNodeStyles = (node, x, y) => {
  const shiftPs = 100

  node.style.transform = `translate(${x * shiftPs}%, ${y * shiftPs}%)`
  if (node.dataset.id === 'null') {
    node.classList.add('_hide')
  }
}