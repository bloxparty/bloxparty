/*global describe, it */

import Board from 'bloxparty-board'
import clone from 'component-clone'
import {Mock, assert as assertElement} from 'deku-testutils'
import {Opponents} from '../../app/game/opponents'

const initialState = {
  opponents: [
    {
      name: 'Foo',
      board: Board()
    },
    {
      name: 'Bar',
      board: Board()
    },
    {
      name: 'Baz',
      board: Board()
    }
  ],
  canvasWidth: 250,
  canvasHeight: 500
}

function getProps () {
  return clone(initialState)
}

describe('Opponents', () => {
  it('returns the the Opponents component', () => {
    const mock = Mock(Opponents)
    const props = getProps()
    const node = mock.render({props})
    assertElement.isNode(node, 'div')
    assertElement.hasClass(node, 'Opponents')
  })
  describe('with props', () => {
    describe('.opponents', () => {
      it('creates a list of opponents', () => {
        const mock = Mock(Opponents)
        const props = getProps()
        const node = mock.render({props})
        assertElement.hasChildren(node, 6)
      })
    })
  })
})
