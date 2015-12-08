/*global describe, it */

import shapes from 'bloxparty-shapes'
import clone from 'component-clone'
import assert from 'assert'
import {Mock, mount, assert as assertElement, findWithClass} from 'deku-testutils'
import Board from 'bloxparty-board'
import PlayerCanvas from '../../app/game/player/canvas'

const initialState = {
  active: true,
  firstPlayer: false,
  board: {
    currentX: 3,
    currentY: 4,
    currentShape: shapes['S'],
    currentShapeVariant: 1,
    grid: Board.randomGrid({cols: 10, rows: 22})
  },
  canvasWidth: 250,
  canvasHeight: 500
}

function getProps () {
  return clone(initialState)
}

describe('PlayerCanvas', () => {
  it('returns the the PlayerCanvas component', () => {
    const mock = Mock(PlayerCanvas)
    const props = getProps()
    const node = mock.render({props})
    assertElement.isNode(node, 'div')
    assertElement.hasClass(node, 'PlayerCanvas')
  })
  describe('with props', () => {
    describe('.canvasWidth', () => {
      it('sets the canvas width', () => {
        const mock = Mock(PlayerCanvas)
        const props = getProps()
        const node = mock.render({props})
        const gridCanvas = findWithClass(node, 'PlayerCanvas-canvas.is-grid')
        const shapeCanvas = findWithClass(node, 'PlayerCanvas-canvas.is-shape')
        assertElement.hasAttribute(gridCanvas, 'width', 250)
        assertElement.hasAttribute(shapeCanvas, 'width', 250)
      })
    })
    describe('.canvasHeight', () => {
      it('sets the canvas height', () => {
        const mock = Mock(PlayerCanvas)
        const props = getProps()
        const node = mock.render({props})
        const gridCanvas = findWithClass(node, 'PlayerCanvas-canvas.is-grid')
        const shapeCanvas = findWithClass(node, 'PlayerCanvas-canvas.is-shape')
        assertElement.hasAttribute(gridCanvas, 'height', 500)
        assertElement.hasAttribute(shapeCanvas, 'height', 500)
      })
    })
  })
  describe('afterRender()', () => {
    it('does not throw', () => {
      const mock = Mock(PlayerCanvas)
      const props = getProps()
      const node = mock.render({props})
      const el = mount(node)
      assert.doesNotThrow(() => {
        PlayerCanvas.afterRender({props}, el.element)
      })
      el.unmount()
    })
  })
})
