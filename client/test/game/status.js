/*global describe, it */

import clone from 'component-clone'
import assert from 'assert'
import {Mock, assert as assertElement, findWithClass} from 'deku-testutils'
import PlayerStatus from '../../app/game/player/status'

const initialState = {
  player: {
    name: 'Foo',
    game: {
      activeLevel: 2,
      winnerName: 'Bar'
    }
  },
  playerLevel: 1,
  events: {
    board: {
      stop: 'stop'
    }
  }
}

function getProps () {
  return clone(initialState)
}

describe('PlayerStatus', () => {
  it('returns the the PlayerStatus component', () => {
    const mock = Mock(PlayerStatus)
    const props = getProps()
    const node = mock.render({props})
    assertElement.isNode(node, 'div')
    assertElement.hasClass(node, 'PlayerStatus')
  })
  describe('with props', () => {
    describe('.playerLevel', () => {
      it('displays the board level', () => {
        const mock = Mock(PlayerStatus)
        const props = getProps()
        const node = mock.render({props})
        const levelNode = findWithClass(node, 'PlayerStatus-level')
        assertElement.hasChild(levelNode, 1, (child) => {
          assert.equal(child, '1')
        })
      })
    })
    describe('player.game.activeLevel', () => {
      it('displays the active level', () => {
        const mock = Mock(PlayerStatus)
        const props = getProps()
        const node = mock.render({props})
        const levelNode = findWithClass(node, 'PlayerStatus-activeLevel')
        assertElement.hasChildren(levelNode, (child) => {
          assert.equal(child, 'Active Level: 2')
        })
      })
    })
    describe('player.game.winnerName', () => {
      it('displays the winner name', () => {
        const mock = Mock(PlayerStatus)
        const props = getProps()
        const node = mock.render({props})
        const winnerNode = findWithClass(node, 'PlayerStatus-winner')
        assertElement.hasChildren(winnerNode, (child) => {
          assert.equal(child, 'Winner: Bar')
        })
      })
    })
  })
})
