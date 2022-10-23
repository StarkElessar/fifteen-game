import { headerHTML } from '../components/headerHTML'
import { mainPageHTML } from '../components/mainPageHTML'
import { footerHTML } from '../components/footerHTML'
import { boardContainerHTML } from '../components/boardContainerHTML'
import { settingsHTML } from '../components/settingsHTML'

export const renderHTML = () => {
  const wrapper = document.createElement('div')

  wrapper.classList.add('wrapper')
  document.body.append(wrapper)

  wrapper.insertAdjacentHTML('beforeend', headerHTML())
  wrapper.insertAdjacentHTML('beforeend', mainPageHTML())
  wrapper.insertAdjacentHTML('beforeend', footerHTML())

  const pageContainer = wrapper.querySelector('.page__container')

  pageContainer.insertAdjacentHTML('beforeend', boardContainerHTML())
  pageContainer.insertAdjacentHTML('beforeend', settingsHTML())
}
