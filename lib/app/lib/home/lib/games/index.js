import bus from 'bus'
import dom from 'virtual-element'
import Game from './lib/game'

const name = 'GameList'

function render (component) {
  let props = component.props

  let node = {}

  if (!props.games.length) {
    return dom('div', {class: 'Games'}, [
      dom('div', {class: 'Games-noGames'}, 'There are no active games')
    ])
  }

  let games = props.games.map(function (game) {
    return dom(Game, {game: game})
  })

  return dom('div', {class: 'Games'}, [
    dom('table', {class: 'Games-listContainer'}, [
      dom('thead', {class: 'Games-tableHead'}, [
        dom('tr', [
          dom('th', 'Game Room Name'),
          dom('th', 'Players')
        ])
      ]),
      dom('tbody', games)
    ])
  ])
}

export default {render}
