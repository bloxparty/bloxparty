import bus from 'bus'
import element from 'virtual-element'

let keys = {
  37: 'left',
  39: 'right',
  40: 'down',
  38: 'rotate',
  32: 'drop'
}

function render (component, setState) {
  let {countdown} = component.props

  document.body.onkeydown = function (event) {
    if (typeof keys[event.keyCode] !== 'undefined') {
      bus.emit('player:move', keys[event.keyCode])
    }
  }

  return element('div')
}

export default {render}
