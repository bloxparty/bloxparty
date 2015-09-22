/**
 * Module dependencies
 */

import Router from 'wayfarer'

let router = Router()

/**
 * Expose `routes`
 */

export default routes

routes.router = router

/**
 * Define routes
 */

function routes (app) {
  setup()

  function setup () {
    router.on('/', connect)
    router.on('/home', home)
    router.on('/game', game)
    router('/')
  }

  function connect () {
    app.set('currentRoute', {name: 'connect'})
  }

  function home () {
    app.set('currentRoute', {name: 'home'})
  }

  function game () {
    app.set('currentRoute', {name: 'game'})
  }
}
