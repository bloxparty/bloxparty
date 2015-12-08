import debug from 'debug'
import Emitter from 'component-emitter'
import randomName from 'random-name'
import clone from 'component-clone'
import uuid from 'uuid'
import events from './events'
import db from './db'
import queue from './queue'

const GameDB = db().games

module.exports = Game
debug('Game')

/**
 * Initialize `Game`
 * @return {Game}
 */
function Game () {
  if (!(this instanceof Game)) return new Game()
  this.id = uuid()
  this.name = randomName.place()
  this.players = []
  this.winnerName = null
  this.active = false
  this.activePlayers = []
  this.chatLog = []
  return this
}

/**
 * Mixins
 */
Emitter(Game.prototype)

/**
 * Return a JSON representation of this game
 * @return {Object} JSON Object
 */
Game.prototype.json = function json () {
  const players = []
  let activeLevel = 0

  this.players.forEach(player => {
    players.push({
      id: player.id,
      name: player.name,
      board: player.board.json()
    })
    activeLevel = activeLevel + player.board.level
  })

  activeLevel = Math.floor(activeLevel / players.length)

  return {
    id: this.id,
    name: this.name,
    winnerName: this.winnerName,
    players: players,
    active: this.active,
    activeLevel: activeLevel,
    chatLog: this.chatLog
  }
}

/**
 * Add a new `Player` instance to this game
 * @param  {Player} player Player object
 * @return {Player}
 */
Game.prototype.newPlayer = function newPlayer (player) {
  this.players.push(player)
  this.bindPlayer(player)
  return player
}

/**
 * Bind `player`
 * @param  {Player} player Player object
 * @return {Player}
 */
Game.prototype.bindPlayer = function bindPlayer (player) {
  const self = this
  player.on('lose', () => {
    if (self.activePlayers.length !== 1) self.deactivatePlayer(player.id)
    self.checkForWinner()
  })
  player.on(events.client.sendGameMsg, (msg) => {
    if (msg) self.chatLog.push(msg)
  })
  return player
}

/**
 * Remove bindings from `player`
 * @param  {Player} player Player object
 * @return {Player}
 */
Game.prototype.unbindPlayer = function unbindPlayer (player) {
  player.off('lose')
  player.off(events.client.sendGameMsg)
  return player
}

/**
 * Distribute new lines to players
 * @param  {String} from   Id of player sending lines
 * @param  {String} to     Id of player receiving lines or all if none
 * @param  {Number} count Number of lines to distribute
 */
Game.prototype.distLines = function distLines (from, to, count) {
  const fromPlayer = this.players.filter(player => player.id === from)[0]

  if (to) {
    this.activePlayers.some(player => {
      if (player.id !== to) return false
      player.addLines(count)
      debug('player %s sent %d lines to player %s', fromPlayer.name, count, player.name)
      return true
    })
  } else {
    this.activePlayers.forEach(player => {
      if (player.id === fromPlayer.id) return
      player.addLines(count)
    })
    this.chatLog.push({
      text: 'player ' + fromPlayer.name + ' sent ' + count + ' lines to everyone',
      date: Date.now(),
      name: 'Server'
    })
    debug('player %s sent %d lines to everyone', fromPlayer.name, count)
  }
}

/**
 * Deactivate player with `id`
 * @param  {String} id Player id
 * @api public
 */
Game.prototype.deactivatePlayer = function deactivatePlayer (id) {
  this.activePlayers = this.activePlayers.filter(player => id !== player.id)
  this.emit('change')
}

/**
 * Remove `player` from this game
 * @param  {String} player  Player object
 */
Game.prototype.removePlayer = function removePlayer (player) {
  this.unbindPlayer(player)
  this.players = this.players.filter(p => p.id !== player.id)
  if (this.players.length === 0) this.destroy()
}

/**
 * Check for game winner
 * @api public
 */
Game.prototype.checkForWinner = function checkForWinner () {
  if (this.activePlayers.length > 1 || this.activePlayers.length === 0) return
  this.stop()
  const winnerId = this.activePlayers[0].id
  const winner = this.players.filter(player => winnerId === player.id)
  this.winnerName = winner[0].name
  this.emit('winner', this.winnerName)
  debug('player %s won game %s', this.winnerName, this.name)
}

Game.prototype.setActivePlayers = function setActivePlayers () {
  this.activePlayers = this.players.map((player) => { return player })
}

/**
 * Start this game
 * @api public
 */
Game.prototype.start = function start () {
  const self = this
  this.active = true
  this.winnerName = null
  this.distQueue()
  this.setActivePlayers()
  setTimeout(function () {
    self.players.forEach(player => player.start())
    self.emit('start')
  }, 1000)
  debug('starting game %s', this.name)
}

Game.prototype.stop = function stop () {
  this.active = false
}

Game.prototype.distQueue = function distQueue () {
  const q = queue()
  this.players.forEach((player) => {
    player.socket.emit(events.board.queue, clone(q))
  })
}

/**
 * Tear down this game
 * @api private
 */
Game.prototype.destroy = function destroy () {
  const id = this.id
  GameDB.toJSON().some((game, index) => {
    if (game.id === id) {
      GameDB.splice(index, 1)
      return true
    }
  })
}
