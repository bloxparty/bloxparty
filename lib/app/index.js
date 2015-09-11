import element from 'dekujs/virtual-element'
import bus from 'component/bus'
import Connect from '/lib/connect'
import Home from '/lib/home'
import Sidebar from '/lib/sidebar'
import Game from '/lib/game'

var propTypes = {
  config: {source: 'config'},
  connected: {source: 'connected'},
  visitHome: {source: 'visitHome'},
  visitGame: {source: 'visitGame'},
  visitConnect: {source: 'visitConnect'},
  route: {source: 'currentRoute'},
  player: {source: 'player'},
  client: {source: 'client'},
  board: {source: 'board-client'},
  stats: {source: 'stats'},
  err: {source: 'err'}
}

function render ({props}) {
  let view = 'div'
  let sidebarProps = {groups: []}

  if (props.route && props.route.name === 'connect') {
    view = Connect
  }

  function newGame () {
    bus.emit('game:join')
  }

  function logOut () {
    bus.emit('network:disconnect')
  }

  function startGame (event) {
    bus.emit('game:start')
  }

  function quitGame (event) {
    bus.emit('game:quit')
  }

  if (props.route && props.route.name === 'home') {
    view = Home
    props = {
      client: props.client,
      visitGame: props.visitGame,
      visitConnect: props.visitConnect,
      stats: props.stats,
      connected: props.connected
    }

    let players = props.stats.players.map(function (player) {
      return {
        text: player.nick
      }
    })

    players.unshift({text: 'Connected Players'})

    sidebarProps = {
      groups: [
        [
          {
            text: 'Main'
          },
          {
            text: 'New Game',
            action: newGame
          },
          {
            text: 'Log Out',
            action: logOut
          }
        ],
        players
      ]
    }
  }

  if (props.route && props.route.name === 'game') {
    view = Game
    props = {
      config: props.config,
      client: props.client,
      visitHome: props.visitHome,
      board: props.board
    }

    let startGameAction = null
    startGameAction = startGame
    // if (props.client) {
    //   let game = props.client.game
    //   if (game && game.players && game.players[0].id === props.client.id) {
    //     if (!game.active && game.players.length > 1) startGameAction = startGame
    //   }
    // }

    sidebarProps = {
      groups: [
        [
          {
            text: 'Game'
          },
          {
            text: 'Start Game',
            action: startGameAction
          },
          {
            text: 'Quit Game',
            action: quitGame
          }
        ]
      ]
    }
  }

  return element('div', {class: 'App'}, [
    element(Sidebar, sidebarProps),
    element('div', {class: 'App-content'}, [
      element(view, props)
    ])
  ])
}

export default {propTypes, render}
