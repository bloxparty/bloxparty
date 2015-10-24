import dom from 'virtual-element'
import Games from './lib/games'
import Players from './lib/players'

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

  return dom('div', {class: 'Home'}, [
    dom('div', {class: 'Home-statsContainer'}, [
      dom('div', {class: 'Home-gamesContainer'}, [
        dom(Games, {games: stats.games})
      ]),
      dom('div', {class: 'Home-playersContainer'}, [
        dom('div', {class: 'Box'}, [
          dom('div', {class: 'Box-head'}, [
            dom('h2', 'Players')
          ]),
          dom('div', {class: 'Box-content'}, [
            dom(Players, {players: stats.players})
          ])
        ])
      ])
    ])
  ])
}

export default {name, render}
