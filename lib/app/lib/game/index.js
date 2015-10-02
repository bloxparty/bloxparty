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
    dom('h1', {class: 'Game-gameRoomName'}, 'Game Room: ' + game.name),
    dom('div', {class: 'Game-player'}, playerView),
    dom('div', {class: 'Game-opponents'}, [
      dom('div', {class: 'Grid Grid--withGutter'}, opponentViews)
    ])
  ])
}

function beforeUnmount () {
  document.removeEventListener('keydown', keyHandler)
}

/**
 * Create Sidebar Values
 * @param  {Object} props
 * @return {Object}
 * @api public
 */
function sidebar (props) {
  let {client} = props
  let firstPlayer = null
  if (!client || !client.game) return

  function quitGame () {
    bus.emit('game:quit')
  }

  function startGame () {
    bus.emit('game:start')
  }

  if (client.game.players[0].id === client.id) firstPlayer = true

  let sidebarProps = {
    groups: [
      [
        {
          text: 'Game'
        },
        {
          text: 'Quit Game',
          action: quitGame
        }
      ]
    ]
  }

  if (firstPlayer) {
    sidebarProps.groups[0].splice(1, 0, {
      text: 'Start Game',
      action: startGame
    })
  }
  return sidebarProps
}

export default {render, beforeUnmount, sidebar, name}
