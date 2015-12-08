/*global describe, it */

import clone from 'component-clone'
import assert from 'assert'
import {Mock, assert as assertElement, findWithClass} from 'deku-testutils'
import {PlayerList} from '../../app/home/player-list'
import PlayerListItem from '../../app/home/player-list/player-list-item'

function getProps () {
  return clone({
    players: [
      {name: 'Foo'},
      {name: 'Bar'}
    ]
  })
}

describe('PlayerList', () => {
  it('returns the PlayerList element', () => {
    const mock = Mock(PlayerList)
    const node = mock.render()
    assertElement.isNode(node, 'div')
    assertElement.hasAttribute(node, 'class', 'PlayerList')
  })
  describe('with props', () => {
    describe('.players', () => {
      it('creates a list of players', function () {
        const mock = Mock(PlayerList)
        const props = getProps()
        const node = mock.render({props})
        const listNode = findWithClass(node, 'PlayerList-list')
        assertElement.isNode(listNode, 'ul')
        assertElement.hasChild(listNode, 0, (listItemNode) => {
          assertElement.isNode(listItemNode, PlayerListItem)
          assertElement.hasChildren(listItemNode, (textNode) => {
            assert.equal(textNode, 'Foo')
          })
        })
        assertElement.hasChild(listNode, 1, (listItemNode) => {
          assertElement.isNode(listItemNode, PlayerListItem)
          assertElement.hasChildren(listItemNode, (textNode) => {
            assert.equal(textNode, 'Bar')
          })
        })
      })
    })
  })
})
