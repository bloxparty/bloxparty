import element from 'virtual-element'
import bus from 'bus'
import Connect from './lib/connect'
import Home from './lib/home'
import Sidebar from './lib/sidebar'
import Game from './lib/game'

var propTypes = {
  config: {source: 'config'},
  connected: {source: 'connected'},
  visitHome: {source: 'visitHome'},
  visitGame: {source: 'visitGame'},
  visitConnect: {source: 'visitConnect'},
  route: {source: 'currentRoute'},
  client: {source: 'client'},
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

    let startGameAction = null
    startGameAction = startGame

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
