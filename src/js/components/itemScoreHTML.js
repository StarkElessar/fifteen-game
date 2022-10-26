export const itemScoreHTML = ({sizeBoard, time}, index) => `
  <li class="score__item">
    <span class="score__label">#</span><span class="score__value">${index + 1}.</span>
    <span class="score__label">Размер доски:</span><span class="score__value">${sizeBoard} - </span>
    <span class="score__label">Время:</span><span class="score__value">${time}</span>
  </li>
`