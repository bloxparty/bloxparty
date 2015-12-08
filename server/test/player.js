/*global describe, it, afterEach*/
import Emitter from 'component-emitter'
import clone from 'component-clone'
import assert from 'assert'
import Player from '../player'
import db from '../db'

const {games, players} = db()

var socket = {}

Emitter(socket)

socket.join = function (room) {
  this.emit('join', room)
}

socket.leave = function (room) {
  this.emit('leave', room)
}

socket.disconnect = function () {
  this.emit('disconnect')
}

function attrs () {
  var s = clone(socket)
  return {
    socket: s,
    name: 'foo'
  }
}

afterEach((done) => {
  while (players.length > 0) {
    players.pop()
  }
  while (games.length > 0) {
    games.pop()
  }
  done()
})

describe('Player', () => {
  describe('Player()', () => {
    it('returns a new instance', () => {
      assert(Player(attrs()) !== Player(attrs()))
    })
  })

  describe('Player#json', () => {
    it('returns player.id', () => {
      assert(Player(attrs()).json().id)
    })
    it('returns player.name', () => {
      assert(Player(attrs()).json().name === 'foo')
    })
    it('returns player.board', () => {
      assert(Player(attrs()).json().board)
    })
    it('returns player.game', () => {
      assert.equal(Player(attrs()).json().game, null)
    })
  })

  describe('Player#disconnect', () => {
    it('emits disconnect', (done) => {
      var player = Player(attrs())
      player.on('disconnect', () => {
        done()
      })
      player.disconnect()
    })
    it('clears player interval', (done) => {
      var player = Player(attrs())
      player.on('disconnect', () => {
        assert(player.interval === null)
        done()
      })
      player.disconnect()
    })
  })

  describe('Player#quitGame', () => {
    it('sets Player.game to null', () => {
      const player = Player(attrs())
      player.createGame()
      assert(player.game !== null)
      player.quitGame()
      assert(player.game === null)
    })
  })

  describe('Player#createGame', () => {
    it('creates a new game', () => {
      var player = Player(attrs())
      player.createGame()
      assert(player.game)
      assert(player.game.players[0] === player)
    })
  })

  describe('Player#joinGame', () => {
    it('creates a new game if no id is given', () => {
      var player = Player(attrs())
      player.joinGame()
      assert(player.game === games[0])
      assert(games[0].players[0] === player)
    })
  })

  describe('Player#lose', () => {
    it('emits lose', (done) => {
      var player = Player(attrs())
      player.on('lose', () => {
        assert(true)
        done()
      })
      player.lose()
    })
  })

  describe('Player#destroy', () => {
    it('emits destroy event', (done) => {
      var player = Player(attrs())
      assert(player.interval !== null)
      player.on('destroy', () => {
        assert(true)
        done()
      })
      player.destroy()
    })
    it('clears player.interval', (done) => {
      var player = Player(attrs())
      assert(player.interval !== null)
      player.on('destroy', () => {
        assert(player.interval === null)
        done()
      })
      player.destroy()
    })
  })

  describe('Player#start', () => {
    it('returns false if player is not in game', function () {
      var player = Player(attrs())
      assert(player.start() === false)
    })
    it('emits `startGame` on socket', (done) => {
      var player = Player(attrs())
      player.socket.on('startGame', () => {
        assert(true)
        done()
      })
      player.createGame()
      player.start()
    })
  })
})
