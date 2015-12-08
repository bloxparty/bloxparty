/*global describe, it*/
var Emitter = require('component-emitter')
var uid = require('uuid')
var assert = require('assert')
var clone = require('component-clone')
var Player = require('../player')
var Game = require('../game')
var socket = {}

Emitter(socket)

socket.join = function (room) {
  this.emit('join', room)
}

socket.join = function (room) {
  this.emit('join', room)
}

socket.leave = function (room) {
  this.emit('leave', room)
}

socket.disconnect = function () {
  this.emit('disconnect')
}

function getPlayer () {
  return Player({
    nick: uid(),
    socket: clone(socket)
  })
}

describe('Game', function () {
  describe('Game()', function () {
    it('returns a new instance', function () {
      assert(Game() !== Game())
    })
  })
  describe('Game#newPlayer', function () {
    it('adds a player to this game', function () {
      var player1 = getPlayer()
      var game = Game()
      assert(player1.game === null)
      game.newPlayer(player1)
      assert(game.players[0] === player1)
    })
  })
  describe('Game#removePlayer', function () {
    it('removes a player from the game', function () {
      var player1 = getPlayer()
      var player2 = getPlayer()
      var game = Game()
      assert(game.players.length === 0)
      game.newPlayer(player1)
      game.newPlayer(player2)
      assert(game.players.length === 2)
      game.removePlayer(player1)
      game.removePlayer(player2)
      assert(game.players.length === 0)
    })
  })
  describe('Game#deactivatePlayer', function () {
    it('removes player from list of active players', function () {
      var player = getPlayer()
      var game = Game()

      game.on('start', function () {
        assert(game.activePlayers.length === 1)
        game.deactivatePlayer(player.id)
        assert(game.activePlayers.length === 0)
      })

      game.newPlayer(player)
      game.start()
    })
  })
  describe('Game#checkForWinner', function () {
    it('sets winnerName when winner is found', function () {
      var player1 = getPlayer()
      var game = Game()
      game.newPlayer(player1)
      game.setActivePlayers()
      game.checkForWinner()
      assert(game.winnerName = player1.name)
    })
  })
  describe('Game#bindPlayer', function () {
    it('inits listener for lose event', function () {
      var player1 = getPlayer()
      var player2 = getPlayer()
      var game = Game()
      game.players.push(player1)
      game.players.push(player2)
      game.setActivePlayers()
      assert(game.activePlayers.length === 2)
      game.bindPlayer(player1)
      player1.emit('lose')
      assert(game.activePlayers.length === 1)
      assert(game.winnerName === player2.name)
    })
  })
  describe('Game#distLines', function () {
    it('distributes new lines to players', function (done) {
      const player1 = getPlayer()
      const player2 = getPlayer()
      const game = Game()

      player2.socket.on('addLines', (count) => {
        assert(count === 1)
        done()
      })

      game.newPlayer(player1)
      game.newPlayer(player2)
      game.start()
      game.distLines(player1.id, null, 1)
    })
    it('distributes lines only to active players', function (done) {
      const player1 = getPlayer()
      const player2 = getPlayer()
      const game = Game()

      let checkTimeout = setTimeout(function () {
        assert(true)
        done()
      }, 500)

      player2.socket.on('board:addLines', (count) => {
        clearTimeout(checkTimeout)
        assert(false)
        done()
      })

      game.newPlayer(player1)
      game.start()
      game.newPlayer(player2)
      game.distLines(player1.id, null, 1)
    })
  })
})
