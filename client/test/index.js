/*global describe, it */

import {Mock, assert as assertElement} from 'deku-testutils'
import App from '../app'
import MainComponent from '../app/main'

describe('App', function () {
  const mock = Mock(App)

  it('returns the App element', function () {
    let node = mock.render()
    assertElement.isNode(node, 'div')
    assertElement.hasAttribute(node, 'class', 'App')
  })
  it('displays a <div> with the class App-content', function () {
    let node = mock.render()
    assertElement.hasChild(node, 0, function (child) {
      assertElement.hasAttribute(child, 'class', 'App-content')
    })
  })
  it('displays the Main element within App-content', function () {
    let node = mock.render()
    assertElement.hasChild(node, 0, function (appContent) {
      assertElement.hasAttribute(appContent, 'class', 'App-content')
      assertElement.hasChildren(appContent, (Main) => {
        assertElement.isNode(Main, MainComponent)
      })
    })
  })
})
