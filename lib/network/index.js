import bus from 'component/bus'
import Socket from './socket'

export default function plugin () {
  return function (app) {
    var stats = {
      games: [],
      players: []
    }
    app.set('stats', stats)
    app.set('err', '')

    var socket = new Socket()

    socket.on('connect_error', function () {
      app.set('err', 'Could not find server')
    })

    socket.on('err', function (err) {
      app.set('err', err)
    })
    socket.on('disconnect', function () {
      app.set('connected', false)
    })
    socket.on('connected', function () {
      app.set('connected', true)
    })
    socket.on('client', function (data) {
      bus.emit('client', data)
      app.set('client', data)
    })
    socket.on('stats', (data) => app.set('stats', data))
    socket.on('game:stop', function () {
      bus.emit('game:stop')
    })
    socket.on('board:start', function () {
      bus.emit('board:start')
    })

    bus.on('player:move', (direction) => socket.send('player:move', direction))
    bus.on('network:connect', function (serverURI, nick) {
      socket.connect(serverURI, nick)
    })
    bus.on('network:disconnect', () => socket.disconnect())
    bus.on('game:join', (id) => socket.send('game:join', id))
    bus.on('game:start', () => socket.send('game:start'))
    bus.on('game:quit', () => socket.send('game:quit'))
  }
}
