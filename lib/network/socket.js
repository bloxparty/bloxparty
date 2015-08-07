import io from 'automattic/socket.io-client:socket.io.js'
import Emitter from 'component/emitter'

export default class Socket extends Emitter {
  constructor () {
    super()
    this.socket = null
  }

  connect (serverURI, nick) {
    var self = this
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
  }

  disconnect () {
    this.socket.disconnect()
    this.emit('disconnect')
  }

  send (message, data) {
    this.socket.emit(message, data)
  }
}
