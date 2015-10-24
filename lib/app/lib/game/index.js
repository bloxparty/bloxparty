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
  32: 'drop'
}

function keyHandler (event) {
  if (typeof keys[event.keyCode] !== 'undefined') {
    bus.emit('player:move', keys[event.keyCode])
  }
}

/**
 * Render the Game view
 * @param  {Object} component
 * @return {Object}
 */
function render (component) {
  let {client, visitHome, board} = component.props
  let game = client.game
  let gameName = null
  let playerView = null
  let opponentViews = []

  if (!game) {
    visitHome()
    return dom('div')
  }

  document.addEventListener('keydown', keyHandler)

  game.players.forEach(function (player, index) {
    if (player.id === client.id)
      playerView = dom(Player, component.props)
    else
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
