/*global describe, it */

import clone from 'component-clone'
import assert from 'assert'
import {Mock, assert as assertElement} from 'deku-testutils'
import PlayerListItem from '../../app/home/player-list/player-list-item'

function getProps () {
  return clone({player: {name: 'Foo'}})
}

describe('PlayerListItem', () => {
  it('returns the PlayerListItem element', () => {
    const mock = Mock(PlayerListItem)
    const props = getProps()
    const node = mock.render({props})
    assertElement.isNode(node, 'li')
    assertElement.hasAttribute(node, 'class', 'PlayerListItem')
  })
  describe('with props', () => {
    describe('.player', () => {
      it('displays the player name', function () {
        const mock = Mock(PlayerListItem)
        const props = getProps()
        const node = mock.render({props})
        assertElement.hasChildren(node, (child) => {
          assert.equal(child, 'Foo')
        })
      })
    })
  })
})
