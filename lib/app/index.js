import dom from 'virtual-element'
import Main from './lib/main'
import Topbar from './lib/topbar'

const name = 'App'

/**
 * App Component
 * @param  {Object} component Component object
 * @return {Object} Deku component
 */
function render (component) {
  return dom('div', {class: 'App'}, [
    dom(Topbar, component.props),
    dom('div', {class: 'App-content'}, [
      dom(Main, component.props)
    ])
  ])
}

export default {render, name}
