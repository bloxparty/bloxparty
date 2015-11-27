/*global describe, it */

import Mock from 'component-mock'
import assert from '../assertions'
import App from '../../lib/app'
import MainComponent from '../../lib/app/lib/main'

describe('App', function () {
  const mock = Mock(App)

  it('returns the App element', function () {
    let node = mock.render()
    assert.node.isNode(node, 'div')
    assert.node.hasAttribute(node, 'class', 'App')
  })
  it('displays the Topbar element', function () {
    let node = mock.render()
    assert.node.hasChild(node, 0, function (child) {
      assert.equal(child.type.name, 'Topbar')
    })
  })
  it('displays a <div> with the class App-content', function () {
    let node = mock.render()
    assert.node.hasChild(node, 1, function (child) {
      assert.node.hasAttribute(child, 'class', 'App-content')
    })
  })
  it('displays the Main element within App-content', function () {
    let node = mock.render()
    assert.node.hasChild(node, 1, function (appContent) {
      assert.node.hasAttribute(appContent, 'class', 'App-content')
      assert.node.hasChildren(appContent, (Main) => {
        assert.node.isNode(Main, MainComponent)
      })
    })
  })
})
