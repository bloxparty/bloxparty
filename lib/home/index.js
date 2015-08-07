import bus from 'component/bus'
import element from 'dekujs/virtual-element'
import Games from './lib/games'
import Players from './lib/players'

let name = 'Home'

function render (component, setState) {
  let {stats, client, visitGame} = component.props

  if (client && client.gameId) visitGame()

  function newGame () {
    bus.emit('game:join')
  }

  return element('div', {class: 'Home'}, [
    element('div', {class: 'Grid'}, [
      element('div', {class: 'Grid-cell u-size1of2'}, [
        element(Games, {games: stats.games})
      ]),
      element('div', {class: 'Grid-cell u-size1of2'}, [
        element(Players, {players: stats.players})
      ]),
      element('div', {class: 'Grid-cell u-sizeFull'}, [
        element('button', {
          onClick: newGame,
          class: 'Button Home-newGameButton'
        }, ['Create New Game'])
      ])
    ])
  ])
}

export default {name, render}
