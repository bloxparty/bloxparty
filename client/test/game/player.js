/*global describe, it */

import shapes from 'bloxparty-shapes'
import clone from 'component-clone'
import {Mock, assert as assertElement} from 'deku-testutils'
import Board from 'bloxparty-board'
import Player from '../../app/game/player'

const initialState = {
  board: Board(),
  player: {
    name: 'Foo',
    id: 1
  },
  game: {
    active: true,
    players: [
      {
        name: 'Foo',
        id: 1
      },
      {
        name: 'Bar',
        id: 2
      }
    ]
  },
  canvasWidth: 250,
  canvasHeight: 500
}

function getProps () {
  const grid = Board.randomGrid()
  const state = clone(initialState)
  state.board.grid = grid
  state.board.currentShape = shapes['S']
  return state
}

describe('Player', () => {
  it('returns the the Player component', () => {
    const mock = Mock(Player)
    const props = getProps()
    const node = mock.render({props})
    assertElement.isNode(node, 'div')
    assertElement.hasClass(node, 'Player')
  })
})
