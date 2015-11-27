/*global describe, it */
import reducer from '../../lib/reducers/player'
import {initialState} from '../../lib/reducers/player'
import assert from '../assertions'

describe('Player Reducers', () => {
  it('returns the initial state', () => {
    assert.deepEqual(reducer(undefined, {}), initialState)
  })
  it('handles updatePlayerName', () => {
    const action = {
      type: 'updatePlayerName',
      playerName: 'Foo'
    }
    const nextState = reducer(initialState, action)
    const expected = Object.assign({}, initialState, {
      name: 'Foo'
    })

    assert.deepEqual(nextState, expected)
  })
})
