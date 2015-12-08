import bus from 'bus'
import dom from 'virtual-element'
import OpponentsComponent from './opponents'
import PlayerComponent from './player'
import ChatComponent from '../chat'

let listener

const keys = {
  37: 'left',
  39: 'right',
  40: 'down',
  38: 'rotate',
  32: 'drop',
  83: 'start'
}

/**
 * Expose `Game`
 * @type {Object}
 */
export const Game = {name: 'Game'}

Game.propTypes = {
  player: { source: 'player' },
  board: { source: 'board' },
  events: { source: 'events' }
}

/**
 * Render the Game view
 * @param  {Object} component
 * @return {Object}
 */
Game.render = function render ({props}) {
  const {player, events, board} = props
  const game = player.game
  const opponents = game.players ? game.players.filter((p) => {
    return p.id !== player.id
  }) : []
  const isActive = game.active
  const isFirstPlayer = game.players && game.players.length ? player.id === game.players[0].id : true
  const chatLog = game.chatLog

  function handleChat (msg) {
    bus.emit(events.client.sendChat, msg)
  }

  return dom('div', {class: 'Game'}, [
    dom('div', {class: 'Game-boardBlock'}, [
      dom('div', {class: 'Game-player'}, dom(PlayerComponent, {
        player,
        isActive,
        isFirstPlayer,
        board,
        game,
        canvasWidth: 250,
        canvasHeight: 500,
        events
      })),
      dom('div', {class: 'Game-opponents'}, [
        dom(OpponentsComponent, {
          isActive,
          opponents,
          canvasWidth: 100,
          canvasHeight: 200
        })
      ])
    ]),
    dom('div', {class: 'Game-chatContainer'}, [
      dom(ChatComponent, {
        chatLog, onSubmit: handleChat
      })
    ])
  ])
}

Game.afterMount = function afterMount ({props}) {
  const {events} = props
  listener = function handler (event) {
    if (typeof keys[event.keyCode] !== 'undefined') {
      if (keys[event.keyCode] === 'start') {
        return bus.emit(events.client.requestStartGame)
      }
      return bus.emit(events.board.move, keys[event.keyCode])
    }
  }
  document.addEventListener('keydown', listener)
}

Game.beforeUnmount = function beforeUnmount ({props}) {
  document.removeEventListener('keydown', listener)
}

export default Game
