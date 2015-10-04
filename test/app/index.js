import dom from 'virtual-element'
import Mock from 'component-mock'
import assert from '../assertions'
import App from '../../lib/app'
import { delay, mount } from '../util'

describe('App', function () {
  let mock = Mock(App)

  it('should return the App element', function () {
    let node = mock.render()
    assert.node.isNode(node, 'div')
    assert.node.hasAttribute(node, 'class', 'App')
  })

  describe('with props', function () {
    describe('.route', function () {
      it('should display the given route', function () {
        let props = { route: { name: 'connect' } }
        let node = mock.render({props: props})
        let child = node.children[1].children[0]
        assert.equal(child.type.name, 'Connect')
      })
    })
  })
})