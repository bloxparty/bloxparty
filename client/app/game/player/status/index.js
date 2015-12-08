import bus from 'bus'
import dom from 'virtual-element'

export const PlayerStatus = { name: 'PlayerStatus' }

/**
 * Game Status Component
 */
PlayerStatus.render = function render ({props}) {
  const {playerLevel, player, events} = props
  const {game} = player
  let winnerComponent = null

  if (game.winnerName) {
    bus.emit(events.board.stop)
    winnerComponent = dom('span', {class: 'PlayerStatus-winner'}, [
      'Winner: ' + game.winnerName
    ])
  }

  return dom('div', {class: 'PlayerStatus'}, [
    dom('p', {class: 'PlayerStatus-level'}, [
      'Player Level: ',
      playerLevel ? playerLevel : '0'
    ]),
    dom('p', {class: 'PlayerStatus-activeLevel'}, 'Active Level: ' + game.activeLevel),
    winnerComponent ? winnerComponent : ''
  ])
}

export default PlayerStatus
