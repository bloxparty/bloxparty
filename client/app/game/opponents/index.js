import dom from 'virtual-element'
import OpponentListItem from './opponent'

export const Opponents = {name: 'Opponents'}

Opponents.render = function render ({props}) {
  const {opponents, canvasWidth, canvasHeight, isActive} = props
  const maxPlayers = 6
  let OpponentList = opponents.map((opponent) => {
    return dom(OpponentListItem, {name: opponent.name, board: opponent.board, canvasWidth, canvasHeight, isActive})
  })

  let i = OpponentList.length

  while (i < maxPlayers) {
    OpponentList.push(dom(OpponentListItem, {canvasWidth, canvasHeight}))
    i++
  }

  return dom('div', {class: 'Opponents row between-xs'}, OpponentList)
}

export default Opponents
