/*global describe, it */

import assert from 'assert'
import {Mock, mount, assert as elementAssert, findWithClass} from 'deku-testutils'
import trigger from 'compat-trigger-event'
import clone from 'component-clone'
import Emitter from 'component-emitter'
import GameListItem from '../../app/home/game-list/game-list-item'

const emitter = new Emitter()

function getProps () {
  return clone({
    game: {
      id: '3',
      players: [
        {name: 'Foo'},
        {name: 'Bar'}
      ],
      active: false,
      name: 'Baz'
    },
    onClick: function (id) {
      emitter.emit('onClick', id)
    }
  })
}

describe('GameListItem', () => {
  const mock = Mock(GameListItem)

  it('returns the GameListItem element', () => {
    const props = getProps()
    const node = mock.render({props})
    elementAssert.isNode(node, 'tr')
    elementAssert.hasAttribute(node, 'class', 'GameListItem')
  })

  describe('With props', () => {
    describe('.game', () => {
      describe('.name', () => {
        it('displays the game name', () => {
          const props = getProps()
          const node = mock.render({props})
          const span = findWithClass(node, 'GameListItem-name')
          elementAssert.hasChildren(span, (child) => {
            assert.equal(child, 'Baz')
          })
        })
      })
    })
    describe('.players', () => {
      it('displays the number of players', () => {
        const props = getProps()
        const node = mock.render({props})
        const span = findWithClass(node, 'GameListItem-players')
        elementAssert.hasChildren(span, (child) => {
          assert.equal(child, '2/6')
        })
      })
    })
    describe('.active', () => {
      it('displays the message `Open` if active is falsey', () => {
        const props = getProps()
        const node = mock.render({props})
        const span = findWithClass(node, 'GameListItem-status')
        elementAssert.hasChildren(span, (child) => {
          assert.equal(child, 'Open')
        })
      })
      it('displays the message `In Progress` if active is truthy', () => {
        const props = getProps()
        props.game.active = true
        const node = mock.render({props})
        const span = findWithClass(node, 'GameListItem-status')
        elementAssert.hasChildren(span, (child) => {
          assert.equal(child, 'In Progress')
        })
      })
    })
  })
  describe('.onClick', () => {
    it('executes given function and passes the game id when element is clicked', () => {
      const props = getProps()
      const node = mock.render({props})
      const app = mount(node)
      emitter.on('onClick', function (id) {
        assert.equal(id, 3)
      })
      trigger(app.element, 'click')
    })
  })
})
