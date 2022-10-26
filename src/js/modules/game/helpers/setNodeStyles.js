export const setNodeStyles = (node, x, y) => {
  const shiftPs = 100

  node.style.transform = `translate(${x * shiftPs}%, ${y * shiftPs}%)`
  if (node.dataset.id === '0') {
    node.classList.add('_hide')
  }
}