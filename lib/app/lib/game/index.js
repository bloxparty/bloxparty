import dom from 'virtual-element'
import bus from 'bus'
import Opponent from './lib/opponent'
import Player from './lib/player'

const name = 'Game'

let keys = {
  37: 'left',
  39: 'right',
  40: 'down',
  38: 'rotate',
  32: 'drop',
  83: 'start'
}

function keyHandler (event) {
  if (typeof keys[event.keyCode] !== 'undefined') {
    if (keys[event.keyCode] === 'start') {
      bus.emit('game:start')
      return
    }
    bus.emit('player:move', keys[event.keyCode])
  }
}

/**
 * Render the Game view
 * @param  {Object} component
 * @return {Object}
 */
function render (component) {
  let {client, visitHome} = component.props
  let game = client.game
  let playerView = null
  let opponentViews = []

  if (!game) {
    visitHome()
    return dom('div')
  }

  document.addEventListener('keydown', keyHandler)

  game.players.forEach(function (player, index) {
    if (player.id === client.id) {
      playerView = dom(Player, component.props)
      return
    }
    opponentViews.push(dom(Opponent, {
      player: player,
      width: 100,
      height: 200
    }))
  })

  return dom('div', {class: 'Game'}, [
    dom('div', {class: 'Game-player'}, playerView),
    dom('div', {class: 'Game-opponents'}, [
      dom('div', {class: 'Grid Grid--withGutter'}, opponentViews)
    ])
  ])
}

function beforeUnmount () {
  document.removeEventListener('keydown', keyHandler)
}

export default {render, beforeUnmount, name}
