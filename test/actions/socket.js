'use strict'
/*global describe, it*/
import assert from 'assert'
import {socket} from '../../lib/actions'

describe('socket actions', () => {
  describe('connectToServer()', () => {
    it('creates an action to connect to a server', () => {
      const type = 'connectToServer'
      const expectedAction = {
        type
      }
      assert.deepEqual(socket.connectToServer(), expectedAction)
    })
  })
  describe('updateServerUri(serverUri)', () => {
    it('creates an action to update the server URI', () => {
      const type = 'updateServerUri'
      const serverUri = '127.0.0.1'
      const expectedAction = {
        type,
        serverUri
      }
      assert.deepEqual(socket.updateServerUri(serverUri), expectedAction)
    })
  })
  describe('isConnecting()', () => {
    it('creates an action to signal a connection is being attempted', () => {
      const type = 'isConnecting'
      const expectedAction = {
        type
      }
      assert.deepEqual(socket.isConnecting(), expectedAction)
    })
  })
  describe('connected', () => {
    it('creates an action to signal a connection has been made', () => {
      const type = 'connected'
      const value = true
      const expectedAction = {
        type,
        value
      }
      assert.deepEqual(socket.connected(value), expectedAction)
    })
  })
})
