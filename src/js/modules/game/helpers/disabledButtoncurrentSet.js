export const disabledButtoncurrentSet = (buttons, dimension, board, isShuffled = false) => {
  buttons.forEach((btn) => {
    btn.classList.remove('_active')
    btn.removeAttribute('disabled')
  })
  document.querySelector(`[data-size="${dimension}"]`).classList.add('_active')
  document.querySelector(`[data-size="${dimension}"]`).setAttribute('disabled', true)
  isShuffled ? board.classList.remove('_lock') : board.classList.add('_lock')
}