'use strict'
/*global describe, it*/
import assert from 'assert'
import {route} from '../../lib/actions'

describe('route actions', () => {
  describe('changeRoute(name)', () => {
    it('creates an action to change routes', () => {
      const type = 'changeRoute'
      const name = 'foo'
      const expectedAction = {
        type,
        name
      }
      assert.deepEqual(route.changeRoute(name), expectedAction)
    })
  })
})
