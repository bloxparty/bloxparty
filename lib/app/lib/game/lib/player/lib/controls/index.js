import bus from 'bus'
import dom from 'virtual-element'

const name = 'GamePlayerControls'

function startGame () {
  bus.emit('game:start')
}

function quitGame () {
  bus.emit('game:quit')
}

/**
 * Game Status Component
 */
function render (component) {
  // let player = component.props.client
  // let game = player.game

  return dom('div', {class: 'GamePlayerControls'}, [
    dom('button', {class: 'Button', onClick: startGame}, 'Start Game'),
    dom('button', {class: 'Button', onClick: quitGame}, 'Quit Game')
  ])
}

export default {render, name}
