export const settingsHTML = () => `
  <div class="settings" id="settings">
    <div class="settings__statistic-group">
      <div class="settings__count">
        <span class="settings__count_label">Количество шагов:</span>
        <span class="settings__count_number" id="count">0</span>
      </div>
      <div class="settings__time">
        <span class="settings__time_label">Время прохождения:</span>
        <span class="settings__time_numbers" id="time">-- / --</span>
      </div>
    </div>
    <ul class="settings__list">
      <li class="settings__item">
        <button class="settings__btn" data-size="3">3x3</button>
      </li>
      <li class="settings__item">
        <button class="settings__btn _active" data-size="4" disabled>4x4</button>
      </li>
      <li class="settings__item">
        <button class="settings__btn" data-size="5">5x5</button>
      </li>
      <li class="settings__item">
        <button class="settings__btn" data-size="6">6x6</button>
      </li>
      <li class="settings__item">
        <button class="settings__btn" data-size="7">7x7</button>
      </li>
      <li class="settings__item">
        <button class="settings__btn" data-size="8">8x8</button>
      </li>
    </ul>
  </div>
`