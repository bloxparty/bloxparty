import debug from 'debug'
import db from './db'
import events from './events'
import Board from './board'
import Emitter from 'component-emitter'
import uuid from 'uuid'
import Game from './game'

const GameDB = db().games
const PlayerDB = db().players

module.exports = Player

debug('Player')

/**
 * Initalize `Player` with `attrs`
 * @param {Object} attrs
 * @return {Player}
 */
function Player (attrs) {
  if (!(this instanceof Player)) return new Player(attrs)
  attrs = attrs || {}
  const self = this
  this.name = attrs.name || 'guest'
  this.sendRate = attrs.sendRate || 45
  this.server = attrs.server
  this.id = uuid()
  this.socket = attrs.socket || {}
  this.board = Board()
  this.game = null

  this.socket.on('disconnect', () => self.destroy())
  this.socket.on(events.client.sendBoard, (board) => { self.board.grid = board.grid })
  this.socket.on(events.client.requestStartGame, () => self.startGame())
  this.socket.on(events.client.joinGame, (id) => self.joinGame(id))
  this.socket.on(events.client.quitGame, () => self.quitGame())
  this.socket.on(events.client.signOut, () => self.destroy())
  this.socket.on(events.board.lose, () => self.lose())
  this.socket.on(events.client.sendChat, (msg) => self.chat(msg))
  this.socket.on(events.client.clearLine, function (count) {
    let linesToAdd = 0
    if (count < 2) return
    if (count === 2) linesToAdd = 1
    if (count === 3) linesToAdd = 2
    if (count === 4) linesToAdd = 4
    self.game.distLines(self.id, false, linesToAdd)
  })

  PlayerDB.push(this)
  return this
}

/**
 * Mixins
 */
Emitter(Player.prototype)

/**
 * Return a JSON representation of this player
 * @return {JSON} JSON Object
 */
Player.prototype.json = function json () {
  return {
    id: this.id,
    name: this.name,
    board: this.board.json(),
    game: this.game ? this.game.json() : null
  }
}

/**
 * Join a game with `id`.  If `id` is omitted
 * a new game will be created.
 * @param  {String} id Game ID
 * @return {Function}   Returns `this.createGame()` if `id` is null
 */
Player.prototype.joinGame = function joinGame (id) {
  if (!id) return this.createGame()
  const self = this
  const game = GameDB.find(game => game.id === id)

  game.newPlayer(this)
  this.game = game
  this.game.on('change', () => self.emit('change'))
  this.game.on('winner', () => self.emit(events.server.boardStop))
  this.socket.join(game.id)
  this.emit('change')
  debug('%s joined game %s', this.name, game.name)
}

/**
 * Create a new game
 * @api private
 */
Player.prototype.createGame = function createGame () {
  const game = Game()
  GameDB.push(game)
  this.joinGame(game.id)
  this.emit('change')
  debug('%s created game %s', this.name, game.name)
}

Player.prototype.chat = function chat (msg) {
  var msgObject = {
    text: msg,
    name: this.name,
    date: Date.now()
  }
  if (!this.game) return this.emit(events.client.sendlobbyMsg, msgObject)
  this.emit(events.client.sendGameMsg, msgObject)
}

Player.prototype.startGame = function startGame () {
  if (this.game.players[0].id === this.id) this.game.start()
}

Player.prototype.addLines = function addLines (count) {
  this.socket.emit(events.server.addLines, count)
}

/**
 * Disconnect this player
 * @api public
 */
Player.prototype.disconnect = function disconnect () {
  clearInterval(this.interval)
  this.interval = null
  this.emit('disconnect')
  this.emit('change')
}

/**
 * Quit current game
 * @api private
 */
Player.prototype.quitGame = function quitGame () {
  if (this.game === null) return
  this.socket.leave(this.game.id)
  this.game.removePlayer(this)
  this.board.stop()
  clearInterval(this.interval)
  this.board.reset()
  this.game.off()
  this.game = null
  this.emit(events.server.quitGame)
  this.emit('change')
}

/**
 * Lose the game
 * @api private
 */
Player.prototype.lose = function lose () {
  clearInterval(this.interval)
  this.emit('lose')
  this.emit('change')
}

Player.prototype.destroy = function destroy () {
  this.quitGame()
  clearInterval(this.interval)
  this.interval = null
  PlayerDB.splice(PlayerDB.indexOf(this.json()), 1)
  this.emit('destroy', this)
  this.emit('change')
}

/**
 * Start this player's board
 * @return {Player}
 */
Player.prototype.start = function start () {
  if (!this.game) return false
  const self = this
  this.socket.emit(events.server.startGame)
  this.interval = setInterval(() => {
    self.socket.emit(events.server.playerUpdate, self.json())
  }, self.sendRate)
  this.emit('change')
  return this
}
