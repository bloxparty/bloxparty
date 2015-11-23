/*global describe, it */
import reducer from '../../lib/reducers'
import {initSocket} from '../../lib/reducers/connect'
import assert from '../assertions'
import getStore from '../../lib/store'

const initialState = {
  connect: {
    connected: false,
    connecting: false,
    disconnecting: false,
    socket: null
  }
}

describe('reducer', () => {
  it('handles connect', () => {
    const action = {type: 'connect', serverURI: 'Foo', playerName: 'Bar'}
    const nextState = reducer(initialState, action)
    const expected = {
      connect: {
        connected: false,
        connecting: true,
        disconnecting: false,
        socket: null
      }
    }
    assert.deepEqual(nextState, expected)
  })
  it('handles connected', () => {
    const action = {type: 'connected'}
    const nextState = reducer(initialState, action)
    const expected = {
      connect: {
        connected: true,
        connecting: false,
        disconnecting: false,
        socket: null
      }
    }
    assert.deepEqual(nextState, expected)
  })
  it('connnects', (done) => {
    const store = getStore()
    store.subscribe(() => {
      console.log('here')
      console.log(store.getState())
      done()
    })
    initSocket('localhost:3001', 'Foo')
  })
})
