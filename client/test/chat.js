/*global describe, it */

import {Mock, mount, assert as assertElement} from 'deku-testutils'
import assert from 'assert'
import dom from 'virtual-element'
import trigger from 'compat-trigger-event'
import Chat from '../app/chat'

describe('Chat', function () {
  let mock = Mock(Chat)

  it('returns the Chat element', function () {
    let node = mock.render()
    assertElement.isNode(node, 'div')
    assertElement.hasAttribute(node, 'class', 'Chat')
  })

  describe('with props', function () {
    describe('.chatLog', function () {
      it('should display an empty list when chatLog is empty', function () {
        let node = mock.render()
        let list = node.children[0].children[0]
        assertElement.notHasChildren(list)
      })
      it('should display the given log', function () {
        const date = Date.now()
        let props = {
          chatLog: [
            {
              date: date,
              name: 'Foo',
              text: 'Bar'
            }
          ]
        }
        let node = mock.render({props: props})
        let list = node.children[0].children[0]
        let listItem = list.children[0]
        let name = listItem.children[0]
        let text = listItem.children[1]
        assert.equal(name.children[0], 'Foo')
        assert.equal(text.children[0], 'Bar')
      })
    })
  })
  describe('.onSubmit(message)', function () {
    it('should not fire when the message is empty', function (done) {
      let props = {
        onSubmit: function (message) {
          clearTimeout(timeOut)
          assert(false)
          app.unmount()
          done()
        }
      }

      let timeOut = setTimeout(function () {
        assert(true)
        done()
      }, 50)

      let app = mount(dom(Chat, props))
      trigger(app.element.querySelector('.Chat-form'), 'submit')
    })

    it('should fire when the form is submitted with message', function (done) {
      let props = {
        onSubmit: function (message) {
          assert(message === 'Foo')
          done()
        }
      }

      let app = mount(dom(Chat, props))
      app.element.querySelector('.Chat-input').value = 'Foo'
      trigger(app.element.querySelector('.Chat-form'), 'submit')
    })
  })

  // TODO: I think applying the component's CSS is required for this to pass
  // describe('afterRender', function () {
  //   it('should set the message panel scroll position to the bottom', function () {
  //     let props = {chatLog: []}
  //     let i = 50
  //
  //     while (i > 0) {
  //       props.chatLog.push({
  //         date: Date.now(),
  //         name: 'Foo',
  //         text: 'Bar'
  //       })
  //       i--
  //     }
  //
  //     let app = mount(dom(Chat, props))
  //     let node = mock.render()
  //     let div = app.element.querySelector('.Chat-messages')
  //     Chat.afterRender(node, app.element)
  //     assert(div.scrollTop === div.scrollHeight)
  //   })
  // })
})
