/*global describe, it, beforeEach*/
var io = require('socket.io-client')
var assert = require('assert')
var Server = require('../server')
var server
var socket

describe('App', function () {
  beforeEach(function (done) {
    server = Server()
    server.listen()
    socket = io.connect('http://localhost:3001', {
      'forceNew': true,
      query: 'nick=foo'
    })
    socket.on('connect', function () {
      done()
    })
  })

  describe('App()', function () {
    it('creates a new player when user connects', function () {
      assert(server.Players.length === 1)
      server.destroy()
      socket.disconnect()
    })
  })
  describe('App#listen', function () {
    it('creates a socket', function () {
      assert(server.io)
      server.destroy()
      socket.disconnect()
    })
  })
  describe('App#stats', function () {
    it('returns a collection of server stats', function () {
      var stats = server.stats()
      assert(stats.games)
      assert(stats.players)
      assert(stats.players.length === 1)
      server.destroy()
      socket.disconnect()
    })
  })
  describe('App#sendStats', function () {
    it('broadcasts a collection of server stats', function (done) {
      socket.on('stats', function (stats) {
        assert(stats.games)
        assert(stats.players)
        server.destroy()
        socket.disconnect()
        done()
      })
    })
  })
  describe('App#destroy', function () {
    it('shuts down the server', function (done) {
      server.io.httpServer.on('close', function () {
        assert.equal(server.interval, 0)
        assert.equal(socket.connected, false)
        done()
      })
      server.destroy()
    })
  })
})
