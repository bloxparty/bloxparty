/**
 * Module dependencies.
 */

import Router from 'ianstormtaylor/router'

/**
 * Expose `actions`.
 */

export default actions

/**
 * Define functions for `app`
 * @param  {Object} app App object
 * @api private
 */
function actions (app) {
  setup()

  /**
   * Setup routes and route actions.
   */

  function setup () {
    app.set('visitHome', visitHome)
    app.set('visitConnect', visitConnect)
    app.set('visitGame', visitGame)
  }

  function visitConnect () {
    Router.go('/')
  }

  function visitHome () {
    Router.go('/home')
  }

  function visitGame () {
    Router.go('/game')
  }
}
