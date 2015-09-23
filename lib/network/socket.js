import io from 'socket.io-client'
import Emitter from 'component-emitter'

export default class Socket extends Emitter {
  constructor () {
    super()
    this.socket = null
  }

  connect (serverURI, nick) {
    var self = this

    // Hack to get socket.io to work with Electron
    if (serverURI.substr(7) !== 'http://') serverURI = 'http://' + serverURI

    this.socket = io(serverURI, {
      'forceNew': true,
      query: 'nick=' + nick
    })

    this.socket.on('connect_error', function () {
      self.emit('connect_error')
    })
    this.socket.on('connect', function () {
      self.emit('connected')
    })
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

  disconnect () {
    this.socket.disconnect()
    this.emit('disconnect')
  }

  send (message, data) {
    this.socket.emit(message, data)
  }
}
