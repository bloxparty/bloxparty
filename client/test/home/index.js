/*global describe, it */

import {Mock, assert, findWithClass} from 'deku-testutils'
import Home from '../../app/home'
import GameList from '../../app/home/game-list'
import PlayerList from '../../app/home/player-list'

function getProps () {
  return {
    lobby: {
      games: [],
      players: [],
      chatLog: []
    }
  }
}

describe('Home', () => {
  const mock = Mock(Home)

  it('returns the Home element', () => {
    const node = mock.render({props: getProps()})
    assert.isNode(node, 'div')
    assert.hasAttribute(node, 'class', 'Home')
  })

  it('displays the `Players` sub-component', () => {
    const node = mock.render({props: getProps()})
    const container = findWithClass(node, 'Home-playersContainer')
    assert.isNode(container.children[0], PlayerList)
  })

  it('displays the `Games` sub-component', () => {
    const node = mock.render({props: getProps()})
    const container = findWithClass(node, 'Home-gamesContainer')
    assert.isNode(container.children[0], GameList)
  })
})
