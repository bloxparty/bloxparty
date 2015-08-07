/**
 * Module dependencies
 */

import Router from 'ianstormtaylor/router'

/**
 * Expose `routes`
 */

export default routes

/**
 * Define routes
 */

function routes (app) {
  setup()

  function setup () {
    var router = new Router()
    router
      .on('/', connect)
      .on('/home', home)
      .on('/game', game)
      .listen()
      .start()

    Router.go('/')
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
