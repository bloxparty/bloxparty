/*global describe, it */
import reducer from '../../lib/reducers/route'
import {initialState} from '../../lib/reducers/route'
import assert from '../assertions'

describe('Route Reducer', () => {
  it('returns the initial state', () => {
    assert.deepEqual(reducer(undefined, {}), initialState)
  })
  it('handles changeRoute', () => {
    const action = {
      type: 'changeRoute',
      name: 'Foo'
    }
    const nextState = reducer(initialState, action)
    const expected = Object.assign({}, initialState, {
      name: 'Foo'
    })
    assert.deepEqual(nextState, expected)
  })
})
