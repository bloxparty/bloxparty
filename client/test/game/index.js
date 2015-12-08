/*global describe, it */

import clone from 'component-clone'
import {Mock, assert as assertElement} from 'deku-testutils'
import Board from 'bloxparty-board'
import {Game} from '../../app/game'

const initialState = {
  player: {
    name: 'Foo',
    board: Board(),
    game: {
      players: []
    }
  },
  canvasWidth: 250,
  canvasHeight: 500
}

function getProps () {
  return clone(initialState)
}

describe('Game', () => {
  it('returns the the Game component', () => {
    const mock = Mock(Game)
    const props = getProps()
    const node = mock.render({props})
    assertElement.isNode(node, 'div')
    assertElement.hasClass(node, 'Game')
  })
})
