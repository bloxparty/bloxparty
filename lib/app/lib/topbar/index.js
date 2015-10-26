import bus from 'bus'
import dom from 'virtual-element'

const name = 'Topbar'

function logOut () {
  bus.emit('network:disconnect')
}

/**
 * Topbar Component
 */
function render (component) {
  return dom('div', {class: 'Topbar'}, [
    dom('span', {class: 'Topbar-title'}, 'Blox Party'),
    dom('div', {class: 'Topbar-buttons'}, [
      dom('button', {class: 'Button Topbar-button', onClick: logOut}, 'Log Out')
    ])
  ])
}

export default {render, name}
