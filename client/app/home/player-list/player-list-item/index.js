import dom from 'virtual-element'

export const PlayerListItem = {name: 'PlayerListItem'}

PlayerListItem.render = function render ({props}) {
  const {player} = props
  return dom('li', {class: 'PlayerListItem'}, player.name)
}

export default PlayerListItem
