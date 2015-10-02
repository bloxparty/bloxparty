import bus from 'bus'
import element from 'virtual-element'
import Games from './lib/games'

const name = 'Home'

/**
 * Render the Home view
 * @param  {Object} component Component object
 * @return {Object}
 */
function render (component) {
  let {stats, client, connected, visitGame, visitConnect} = component.props

  if (!connected) visitConnect()
  if (client && client.game) visitGame()

  return element('div', {class: 'Home'}, [
    element(Games, {games: stats.games})
  ])
}

/**
 * Generate sidebar elements for this view
 * @param  {Object} props
 * @return {Object}
 * @api public
 */
function sidebar (props) {
  function newGame () {
    bus.emit('game:join')
  }

  function logOut () {
    bus.emit('network:disconnect')
  }

  let players = props.stats.players.map(function (player) {
    return {text: player.nick}
  })

  players.unshift({text: 'Connected Players'})

  return {
    groups: [
      [
        {text: 'Main'},
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

export default {name, render, sidebar}
