/*global describe, it */

import dom from 'virtual-element'
import Mock from 'component-mock'
import assert from '../assertions'
import Box from '../../lib/app/lib/box'

describe('Box', () => {
  const mock = Mock(Box)

  it('returns the Box element', () => {
    const node = mock.render()
    assert.node.isNode(node, 'div')
    assert.node.hasClass(node, 'Box')
  })
  it('displays a <div> with class Box-head', () => {
    const node = mock.render()
    assert.node.hasChild(node, 0, (child) => {
      assert.node.isNode(child, 'div')
      assert.node.hasClass(child, 'Box-head')
    })
  })
  it('displays a <span> within Box-head with class Box-title', () => {
    const node = mock.render()
    assert.node.hasChild(node, 0, (child) => {
      assert.node.hasClass(child, 'Box-head')
      assert.node.hasChild(child, 0, (child) => {
        assert.node.isNode(child, 'span')
        assert.node.hasClass(child, 'Box-title')
      })
    })
  })
  it('displays a <div> within Box with class Box-content', () => {
    const node = mock.render()
    assert.node.hasChild(node, 1, (child) => {
      assert.node.isNode(child, 'div')
      assert.node.hasClass(child, 'Box-content')
    })
  })

  describe('with props', () => {
    describe('.title', () => {
      it('displays an empty span when title is empty', function () {
        const node = mock.render()
        const span = node.children[0].children[0]
        assert.node.isNode(span, 'span')
        assert.node.hasClass(span, 'Box-title')
        assert.node.notHasChildren(span)
      })
      it('displays the given title', () => {
        const node = mock.render({props: {title: 'Foo'}})
        const span = node.children[0].children[0]
        assert.node.isNode(span, 'span')
        assert.node.hasClass(span, 'Box-title')
        assert.node.hasChildren(span, function (child) {
          assert.equal(child, 'Foo')
        })
      })
    })
    describe('.children', () => {
      it('displays an empty content div when children is empty', function () {
        const node = mock.render()
        const content = node.children[1]
        assert.node.hasClass(content, 'Box-content')
        assert.node.isNode(content, 'div')
        assert.node.notHasChildren(content)
      })
      it('displays the given children', () => {
        const node = mock.render({props: {children: dom('div', 'Foo')}})
        const content = node.children[1]
        assert.node.hasClass(content, 'Box-content')
        assert.node.isNode(content, 'div')
        assert.node.hasChildren(content, function (child) {
          assert.node.isNode(child, 'div')
          assert.node.hasChildren(child, function (child) {
            assert.equal(child, 'Foo')
          })
        })
      })
    })
  })
})
