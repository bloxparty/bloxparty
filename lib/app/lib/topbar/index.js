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
  let logOutIcon = null
  let quitIcon = null

  if (props.connected) {
    logOutIcon = dom('a', {title: 'Sign Out', onClick: logOut}, [
      dom('i', {class: 'fa fa-sign-out'}, '')
    ])
  }

  if (props.electron) {
    quitIcon = dom('a', {title: 'Close Blox Party', onClick: quit}, [
      dom('i', {class: 'fa fa-close'}, '')
    ])
  }

  return dom('div', {class: 'Topbar'}, [
    dom('span', {class: 'Topbar-title'}, 'Blox Party'),
    dom('div', {class: 'Topbar-controls'}, [
      logOutIcon,
      quitIcon
    ])
  ])
}

export default {render, name}
