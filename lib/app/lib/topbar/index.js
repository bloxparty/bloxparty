import bus from 'bus'
import dom from 'virtual-element'

const name = 'Topbar'

/**
 * Topbar Component
 */
function render (component) {
  return dom('div', {class: 'Topbar'}, [
    dom('span', {class: 'Topbar-title'}, 'Blox Party')
  ])
}

export default {render, name}
