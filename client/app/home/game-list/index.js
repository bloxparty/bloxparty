import bus from 'bus'
import dom from 'virtual-element'
import GameListItemComponent from './game-list-item'

export const GameList = {name: 'GameList'}

GameList.render = function render ({props}) {
  let {games, events} = props
  let ListComponent
  let EmptyComponent

  function handleJoinGame (id) {
    bus.emit(events.client.joinGame, id)
  }

  function handleCreateGame () {
    bus.emit(events.client.joinGame)
  }

  if (games && games.length) {
    ListComponent = games.map((game) => {
      return dom(GameListItemComponent, {
        onClick: handleJoinGame,
        game
      })
    })
  } else {
    EmptyComponent = dom('div', {class: 'GameList-empty'}, [
      dom('p', 'There are no current games.')
    ])
  }

  return dom('div', {class: 'GameList'}, [
    dom('div', {class: 'GameList-box Box'}, [
      dom('div', {class: 'Box-head'}, [
        dom('span', {class: 'Box-title'}, 'Games'),
        dom('div', {class: 'Box-controls'}, [
          dom('a', {class: 'Button Box-button', title: 'Create New Game', onClick: handleCreateGame}, [
            dom('i', {class: 'fa fa-plus'})
          ])
        ])
      ]),
      dom('div', {class: 'GameList-boxContent Box-content--no-padding'}, [
        dom('table', {class: 'GameList-table'}, [
          dom('thead', {class: 'GameList-tableHead'}, [
            dom('tr', [
              dom('th', 'Name'),
              dom('th', 'Players'),
              dom('th', 'Status')
            ])
          ]),
          dom('tbody', {}, [
            ListComponent
          ])
        ]),
        EmptyComponent
      ])
    ])
  ])
}

export default GameList
