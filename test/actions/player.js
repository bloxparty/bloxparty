'use strict'
/*global describe, it*/
import assert from 'assert'
import {player} from '../../lib/actions'

describe('player actions', () => {
  describe('updatePlayerName(playerName)', () => {
    it('creates an action to update the player name', () => {
      const type = 'updatePlayerName'
      const playerName = 'Foo'
      const expectedAction = {
        type,
        playerName
      }
      assert.deepEqual(player.updatePlayerName(playerName), expectedAction)
    })
  })
})
