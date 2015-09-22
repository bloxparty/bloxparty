import bus from 'bus'
import element from 'virtual-element'

function render (component, setState) {
  let {props} = component

  function joinGame (event) {
    var game = event.delegateTarget.dataset.gameId
    bus.emit('game:join', game)
  }

  let gameClass = 'Games-listItem'
  let node = {}

  if (props.games.length) {
    let games = props.games.map(function (game) {
      let players = ''
      if (game.players.length) {
        game.players.forEach(function (player) {
          players = players + ' ' + player.nick
        })
      }
      let gameTitle = element('td', {}, [
        element('span', {class: 'Games-name'}, game.name)
      ])

      let playerList = element('td', {}, [
        element('span', {class: 'Games-players'}, players)
      ])

      if (game.players.length === 6) {
        gameClass = gameClass + ' is-Full'
        joinGame = null
      }

      return element('tr', {
        class: gameClass,
        onClick: joinGame,
        'data-game-id': game.id
      }, [
        gameTitle,
        playerList
      ])
    })

    node = element('table', {class: 'Games-listContainer'}, [
      element('thead', {class: 'Games-tableHead'}, [
        element('tr', {}, [
          element('th', {}, 'Game Room Name'),
          element('th', {}, 'Players')
        ])
      ]),
      element('tbody', {}, [
        games
      ])
    ])
  } else {
    node = element('div', {class: 'Games-noGames'}, 'There are no active games')
  }

  return element('div', {class: 'Games'}, [
    node
  ])
}

export default {render}
