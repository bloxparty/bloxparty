import bus from 'bus'
import dom from 'virtual-element'

const name = 'GameItem'

/**
 * Render Games List Item
 * @param  {Object} component
 * @return {Object}
 */
function render (component) {
  let game = component.props.game
  let players = ''

  function joinGame (event) {
    var game = event.delegateTarget.dataset.gameId
    bus.emit('game:join', game)
  }

  if (game.players.length) {
    game.players.forEach(function (player) {
      players = players + ' ' + player.nick
    })
  }

  let gameClass = 'Games-listItem'
  let gameTitle = dom('td', {}, dom('span', {class: 'Games-name'}, game.name))
  let playerList = dom('td', {}, dom('span', {class: 'Games-players'}, players))

  if (game.players.length === 6) {
    gameClass = gameClass + ' is-Full'
    joinGame = null
  }

  return dom('tr', {
    class: gameClass,
    onClick: joinGame,
    'data-game-id': game.id
  }, [gameTitle, playerList])
}

export default {name, render}