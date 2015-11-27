/*global describe, it */
import reducer from '../../lib/reducers/socket'
import {initialState} from '../../lib/reducers/socket'
import assert from '../assertions'

describe('Socket Reducer', () => {
  it('returns the initial state', () => {
    assert.deepEqual(reducer(undefined, {}), initialState)
  })
  it('handles updateServerUri', () => {
    const action = {
      type: 'updateServerUri',
      serverUri: '127.0.0.1'
    }
    const nextState = reducer(initialState, action)
    const expected = Object.assign({}, initialState, {
      serverUri: '127.0.0.1'
    })
    assert.deepEqual(nextState, expected)
  })
  it('handles isConnecting', () => {
    const action = {
      type: 'isConnecting'
    }
    const nextState = reducer(initialState, action)
    const expected = Object.assign({}, initialState, {
      isConnecting: true
    })
    assert.deepEqual(nextState, expected)
  })
  it('handles connected', () => {
    const action = {
      type: 'connected',
      value: true
    }
    const nextState = reducer(initialState, action)
    const expected = Object.assign({}, initialState, {
      connected: true
    })
    assert.deepEqual(nextState, expected)
  })
})
