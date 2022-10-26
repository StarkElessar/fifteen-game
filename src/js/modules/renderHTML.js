import { headerHTML } from '../components/headerHTML'
import { mainPageHTML } from '../components/mainPageHTML'
import { footerHTML } from '../components/footerHTML'
import { boardContainerHTML } from '../components/boardContainerHTML'
import { settingsHTML } from '../components/settingsHTML'
import { scoreModalHTML } from '../components/scoreModalHTML'

export const renderHTML = () => {
  const wrapper = document.createElement('div')

  wrapper.classList.add('wrapper')
  document.body.prepend(wrapper)
  document.body.insertAdjacentHTML('afterbegin', scoreModalHTML())

  wrapper.insertAdjacentHTML('beforeend', headerHTML())
  wrapper.insertAdjacentHTML('beforeend', mainPageHTML())
  wrapper.insertAdjacentHTML('beforeend', footerHTML())

  const pageContainer = wrapper.querySelector('.page__container')

  pageContainer.insertAdjacentHTML('beforeend', boardContainerHTML())
  pageContainer.insertAdjacentHTML('beforeend', settingsHTML())
}
