/*global describe, it */

import Emitter from 'component-emitter'
import dom from 'virtual-element'
import {Mock, mount, findWithClass} from 'deku-testutils'
import clone from 'component-clone'
import trigger from 'compat-trigger-event'
import assert from '../assertions'
import SignIn from '../../lib/app/lib/main/lib/signin'

const emitter = new Emitter()

function getProps (done) {
  const initialProps = {
    player: {name: ''},
    socket: {serverUri: ''},
    playerActions: {
      updatePlayerName: function updatePlayerName (value) {
        emitter.emit('updatePlayerName', value)
      }
    },
    socketActions: {
      updateServerUri: function updateServerUri (value) {
        emitter.emit('updateServerUri', value)
      },
      connectToServer: function connectToServer (value) {
        emitter.emit('connectToServer', value)
      }
    }
  }

  return clone(initialProps)
}

describe('SignIn', () => {
  let mock = Mock(SignIn)

  it('returns the SignIn element', () => {
    let node = mock.render()
    assert.node.isNode(node, 'div')
    assert.node.hasAttribute(node, 'class', 'SignIn')
  })

  describe('with props', () => {
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
    describe('socket.serverUri', () => {
      it('sets serverUri input value to empty string when props are empty', () => {
        const props = getProps()
        let node = mock.render({props})
        let input = findWithClass(node, 'SignIn-serverUriInput')
        assert(input.attributes.value === '')
      })
      it('sets serverUri input value to given serverUri', () => {
        const props = getProps()
        props.socket.serverUri = 'Foo'
        let node = mock.render({props})
        let input = findWithClass(node, 'SignIn-serverUriInput')
        assert(input.attributes.value === 'Foo')
      })
    })
  })
  describe('Actions', () => {
    describe('playerActions.updatePlayerName', () => {
      it('is called when the form is submitted', (done) => {
        const props = getProps(done)
        const app = mount(dom(SignIn, props))
        const form = app.element.querySelector('.SignIn-form')
        const inputs = form.getElementsByTagName('input')

        inputs[0].value = 'Foo'
        inputs[1].value = 'Bar'

        emitter.on('updatePlayerName', (value) => {
          assert(value === 'Foo')
          app.unmount()
          emitter.off()
          done()
        })

        trigger(form, 'submit')
      })
    })
    describe('socketActions.updateServerUri', () => {
      it('is called when the form is submitted', (done) => {
        const props = getProps(done)
        const app = mount(dom(SignIn, props))
        const form = app.element.querySelector('.SignIn-form')
        const inputs = form.getElementsByTagName('input')

        inputs[0].value = 'Foo'
        inputs[1].value = 'Bar'

        emitter.on('updateServerUri', (value) => {
          assert(value === 'Bar')
          app.unmount()
          emitter.off()
          done()
        })

        trigger(form, 'submit')
      })
    })
    describe('socketActions.connectToServer', () => {
      it('is called when the form is submitted', (done) => {
        const props = getProps(done)
        const app = mount(dom(SignIn, props))
        const form = app.element.querySelector('.SignIn-form')
        const inputs = form.getElementsByTagName('input')

        inputs[0].value = 'Foo'
        inputs[1].value = 'Bar'

        emitter.on('connectToServer', () => {
          assert(true)
          app.unmount()
          emitter.off()
          done()
        })

        trigger(form, 'submit')
      })
    })
  })
})
