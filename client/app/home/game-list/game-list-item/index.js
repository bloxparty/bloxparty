import dom from 'virtual-element'

export const GamesListItem = {name: 'GameListItem'}

/**
 * Render Games List Item
 * @param  {Object} component
 * @return {Object}
 */
GamesListItem.render = function render ({props}) {
  const {game, onClick} = props
  const {players, name, active} = game

  function handleOnClick (event) {
    const id = event.delegateTarget.dataset.gameId
    onClick(id)
  }

  const rowProps = {
    class: players.length === 6 ? 'GameListItem is-Full' : 'GameListItem',
    onClick: handleOnClick,
    'data-game-id': game.id
  }

  return dom('tr', rowProps, [
    dom('td', [
      dom('span', {class: 'GameListItem-name'}, name)
    ]),
    dom('td', [
      dom('span', {class: 'GameListItem-players'}, players.length + '/6')
    ]),
    dom('td', [
      dom('span', {class: 'GameListItem-status'}, (active) ? 'In Progress' : 'Open')
    ])
  ])
}

export default GamesListItem
