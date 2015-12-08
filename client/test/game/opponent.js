/*global describe, it */

import shapes from 'bloxparty-shapes'
import clone from 'component-clone'
import assert from 'assert'
import {Mock, mount, assert as assertElement, findWithClass} from 'deku-testutils'
import Board from 'bloxparty-board'
import Opponent from '../../app/game/opponents/opponent'

const initialState = {
  player: {
    name: 'Foo',
    board: Board()
  },
  canvasWidth: 250,
  canvasHeight: 500
}

function getProps () {
  return clone(initialState)
}

describe('Opponent', () => {
  it('returns the the Opponent component', () => {
    const mock = Mock(Opponent)
    const props = getProps()
    const node = mock.render({props})
    assertElement.isNode(node, 'div')
    assertElement.hasClass(node, 'Opponent')
  })
  describe('with props', () => {
    describe('.canvasWidth', () => {
      it('sets the canvas width', () => {
        const mock = Mock(Opponent)
        const props = getProps()
        const node = mock.render({props})
        const gridCanvas = findWithClass(node, 'Opponent-canvas.is-grid')
        assertElement.hasAttribute(gridCanvas, 'width', 250)
      })
    })
    describe('.canvasHeight', () => {
      it('sets the canvas height', () => {
        const mock = Mock(Opponent)
        const props = getProps()
        const node = mock.render({props})
        const gridCanvas = findWithClass(node, 'Opponent-canvas.is-grid')
        assertElement.hasAttribute(gridCanvas, 'height', 500)
      })
    })
  })
  describe('afterRender()', () => {
    it('draws the game on the canvas', () => {
      const mock = Mock(Opponent)
      const props = getProps()
      props.player.board.currentShape = shapes['S']
      const node = mock.render({props})
      const el = mount(node)
      assert.doesNotThrow(() => {
        Opponent.afterRender({props}, el.element)
      })
      el.unmount()
    })
  })
})
