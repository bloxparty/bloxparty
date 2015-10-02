/**
 * Module dependencies.
 */

import routes from '../routes'

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
    return routes.router('/')
  }

  function visitHome () {
    return routes.router('/home')
  }

  function visitGame () {
    return routes.router('/game')
  }
}
