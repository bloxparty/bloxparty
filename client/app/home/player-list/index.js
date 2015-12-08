import dom from 'virtual-element'
import Box from '../../box'
import PlayerListItemComponent from './player-list-item'

/**
 * Expose `PlayerList`
 */
export const PlayerList = {name: 'PlayerList'}

/**
 * Render component `PlayerList`
 * @param  {Object} {props} Props
 * @param  {Array} {props.players} Players to list
 * @return {DekuNode}
 */
PlayerList.render = function render ({props}) {
  const {players} = props
  let ListNode = null

  if (players && players.length) {
    ListNode = players.map((player) => {
      return dom(PlayerListItemComponent, {player})
    })
  }

  return dom('div', {class: 'PlayerList'}, [
    dom(Box, {title: 'Players'}, [
      dom('ul', {class: 'PlayerList-list'}, [
        ListNode
      ])
    ])
  ])
}

export default PlayerList
