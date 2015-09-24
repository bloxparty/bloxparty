import io from 'socket.io-client'
import Emitter from 'component-emitter'

/**
 * Expose `Socket`
 */
module.exports = Socket

/**
 * Initialize new `Socket`
 * @api public
 */
function Socket () {
  if (!(this instanceof Socket)) return new Socket()
  this.socket = null
}

/**
 * Mixins
 */
Emitter(Socket.prototype)

/**
 * Connect to server
 * @param  {String} uri  Server URI
 * @param  {String} nick Player name
 * @api public
 */
Socket.prototype.connect = function connect (uri, nick) {
  var self = this

  // Hack to get socket.io to work with Electron
  if (uri.substr(7) !== 'http://') uri = 'http://' + uri

  this.socket = io(uri, {
    'forceNew': true,
    query: 'nick=' + nick
  })

  this.socket.on('connect_error', () => self.emit('connect_error'))
  this.socket.on('connect', () => self.emit('connected'))
  this.socket.on('disconnect', () => self.emit('disconnect'))
  this.socket.on('client', (data) => self.emit('client', data))
  this.socket.on('stats', (data) => self.emit('stats', data))
  this.socket.on('err', (msg) => self.emit('err', msg))
  this.socket.on('board:start', () => self.emit('board:start'))
  this.socket.on('board:stop', () => self.emit('board:stop'))
  this.socket.on('board:queue', (data) => self.emit('board:queue', data))
  this.socket.on('board:grid', (data) => self.emit('board:grid', data))
  this.socket.on('board:addLines', (count) => self.emit('board:addLines', count))
}

/**
 * Disconnect from server
 * @api public
 */
Socket.prototype.disconnect = function disconnect () {
  this.socket.disconnect()
  this.emit('disconnect')
}

/**
 * Send an event to server
 * @param  {String} event Event name
 * @param  {Mixed} data    Data to send
 * @api public
 */
Socket.prototype.send = function send (event, data) {
  this.socket.emit(event, data)
}
