import bus from 'component/bus'
import element from 'dekujs/virtual-element'

function render (component, setState) {
  let {props} = component

  function joinGame (event) {
    var game = event.target.dataset.gameId
    bus.emit('game:join', game)
  }

  let games = props.games.map(function (game) {
    return element('li', {
      class: 'Games-listItem',
      onClick: joinGame,
      'data-game-id': game.id
    }, [game.name])
  })

  return element('div', {class: 'Games'}, [
    element('h2', {class: 'Games-head'}, ['Games']),
    element('div', {class: 'Games-listContainer'}, [
      element('ul', {class: 'Games-list'}, games)
    ])
  ])
}

export default {render}
