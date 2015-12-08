/*global describe, it */

import clone from 'component-clone'
import assert from 'assert'
import {Mock, mount, assert as assertElement, findWithClass} from 'deku-testutils'
import shapes from 'bloxparty-shapes'
import ShapePreview from '../../app/game/player/preview'

const initialState = {
  canvasWidth: 100,
  canvasHeight: 100
}

function getProps () {
  return clone(initialState)
}

describe('ShapePreview', () => {
  it('returns the the ShapePreview component', () => {
    const mock = Mock(ShapePreview)
    const props = getProps()
    const node = mock.render({props})
    assertElement.isNode(node, 'div')
    assertElement.hasClass(node, 'ShapePreview')
  })
  describe('with props', () => {
    describe('.width', () => {
      it('sets the canvas width', () => {
        const mock = Mock(ShapePreview)
        const props = getProps()
        const node = mock.render({props})
        const canvasNode = findWithClass(node, 'ShapePreview-canvas')
        assertElement.hasAttribute(canvasNode, 'width', 100)
      })
    })
    describe('.height', () => {
      it('sets the canvas height', () => {
        const mock = Mock(ShapePreview)
        const props = getProps()
        const node = mock.render({props})
        const canvasNode = findWithClass(node, 'ShapePreview-canvas')
        assertElement.hasAttribute(canvasNode, 'height', 100)
      })
    })
  })
  describe('afterRender', () => {
    it('draws the shape preview if props.shape is supplied', () => {
      const mock = Mock(ShapePreview)
      const props = getProps()
      props.shape = shapes['S']
      const node = mock.render({props})
      const el = mount(node)
      assert.doesNotThrow(() => {
        ShapePreview.afterRender({props}, el.element)
      })
    })
  })
})
