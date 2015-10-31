import bus from 'bus'
import dom from 'virtual-element'

const name = 'Topbar'

function logOut () {
  bus.emit('network:disconnect')
}

function quit () {
  bus.emit('ipc:quit')
}

/**
 * Topbar Component
 */
function render (component) {
  let props = component.props
  let logOutButton = null
  let quitButton = null

  if (props.connected) {
    logOutButton = dom('button', {
      class: 'Button Topbar-button',
      onClick: logOut
    }, 'Log Out')
  }

  if (props.electron) {
    quitButton = dom('button', {
      class: 'Button Topbar-button',
      onClick: quit
    }, 'Quit')
  }

  return dom('div', {class: 'Topbar'}, [
    dom('span', {class: 'Topbar-title'}, 'Blox Party'),
    dom('div', {class: 'Topbar-buttons'}, [
      logOutButton,
      quitButton
    ])
  ])
}

export default {render, name}
