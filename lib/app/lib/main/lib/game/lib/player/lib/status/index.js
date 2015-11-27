import bus from 'bus'
import dom from 'virtual-element'

const name = 'GamePlayerStatus'

/**
 * Game Status Component
 */
function render (component) {
  let board = component.props.board
  let player = component.props.client
  let game = player.game
  let winnerComponent = null

  if (game.winnerName) {
    winnerComponent = dom('div', {class: 'GamePlayerStatus-winner'}, [
      dom('h3', 'Winner:'),
      game.winnerName
    ])
  }

  return dom('div', {class: 'GamePlayerStatus'}, [
    dom('p', {class: 'GamePlayerStatus-level'}, 'Player Level: ' + player.board.level),
    dom('p', {class: 'GamePlayerStatus-activeLevel'}, 'Active Level: ' + player.game.activeLevel),
    winnerComponent
  ])
}

export default {render, name}