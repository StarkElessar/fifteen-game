import { fifteenCellHTML } from '../../../components/fifteenCellHTML'

export const renderCell = (arr, container, currentSize = 4) => {
  container.innerHTML = ''

  arr.forEach((items) => {
    container.insertAdjacentHTML('beforeend', fifteenCellHTML(items))
  })

  const itemsCell = container.querySelectorAll('.board__item')

  itemsCell.forEach((item) => {
    item.style.width = `${100 / currentSize}%`
    item.style.height = `${100 / currentSize}%`
  })
}
