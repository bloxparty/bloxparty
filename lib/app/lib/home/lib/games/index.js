import bus from 'bus'
import dom from 'virtual-element'
import Game from './lib/game'

const name = 'GameList'

function newGame () {
  bus.emit('game:join')
}

function render (component) {
  let props = component.props
  let gamesView = null

  let games = props.games.map(function (game) {
    return dom(Game, {game: game})
  })

  if (props.games.length) {
    gamesView = dom('div', {class: 'Box-content--no-padding'}, [
      dom('table', {class: 'Games-table'}, [
        dom('thead', {class: 'Games-tableHead'}, [
          dom('tr', [
            dom('th', 'Name'),
            dom('th', 'Players'),
            dom('th', 'Status')
          ])
        ]),
        dom('tbody', games)
      ])
    ])
  } else {
    gamesView = dom('div', {class: 'Box-content Games-noGames'}, [
      dom('p', 'There are no current games.')
    ])
  }

  return dom('div', {class: 'Games'}, [
    dom('div', {class: 'Box'}, [
      dom('div', {class: 'Box-head--large'}, [
        dom('span', {class: 'Box-title'}, 'Games'),
        dom('div', {class: 'Box-controls'}, [
          dom('a', {class: 'Button Box-button', title: 'Create New Game', onClick: newGame}, [
            dom('i', {class: 'fa fa-plus'})
          ])
        ])
      ]),
      gamesView
    ])
  ])
}

export default {render, name}
