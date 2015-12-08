/*global describe, it */

import {Mock, mount, assert as assertElement, findWithClass} from 'deku-testutils'
import bus from 'bus'
import dom from 'virtual-element'
import clone from 'component-clone'
import trigger from 'compat-trigger-event'
import assert from 'assert'
import {SignIn} from '../app/signin'

function getProps (done) {
  const initialProps = {
    player: {name: ''},
    events: {client: {signIn: 'signIn'}}
  }

  return clone(initialProps)
}

describe('SignIn', () => {
  let mock = Mock(SignIn)

  it('returns the SignIn element', () => {
    let node = mock.render()
    assertElement.isNode(node, 'div')
    assertElement.hasAttribute(node, 'class', 'SignIn')
  })

  describe('with props', () => {
    describe('events.client.signIn', () => {
      it('emits this event when the form is submitted', (done) => {
        const props = getProps(done)
        const app = mount(dom(SignIn, props))
        const form = app.element.querySelector('.SignIn-form')
        const inputs = form.getElementsByTagName('input')

        inputs[0].value = 'Foo'

        bus.on('signIn', (value) => {
          assert(value === 'Foo')
          app.unmount()
          bus.off()
          done()
        })

        trigger(form, 'submit')
      })
    })
    describe('player.name', () => {
      it('sets name input value to empty string when props are empty', () => {
        const props = getProps()
        let node = mock.render({props})
        let input = findWithClass(node, 'SignIn-playerNameInput')
        assert(input.attributes.value === '')
      })
      it('sets name input value to given player.name', () => {
        const props = getProps()
        props.player.name = 'Foo'
        let node = mock.render({props})
        let input = findWithClass(node, 'SignIn-playerNameInput')
        assert(input.attributes.value === 'Foo')
      })
    })
  })
})
