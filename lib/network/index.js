import bus from 'bus'
import Socket from './socket'

export default function plugin () {
  return function (app) {
    let socket = Socket()

    let stats = {
      games: [],
      players: []
    }

    app.set('stats', stats)
    app.set('err', '')

    socket.on('connect_error', () => app.set('err', 'Could not find server'))

    socket.on('err', () => app.set('err', err))
    socket.on('disconnect', () => app.set('connected', false))
    socket.on('connected', () => app.set('connected', true))
    socket.on('stats', (data) => app.set('stats', data))

    socket.on('client', function (data) {
      bus.emit('client', data)
      app.set('client', data)
    })

    socket.on('board:stop', () => bus.emit('board:stop'))
    socket.on('board:start', () => bus.emit('board:start'))
    socket.on('board:queue', (data) => bus.emit('board:queue', data))
    socket.on('board:grid', (data) => bus.emit('board:grid', data))
    socket.on('board:addLines', (count) => bus.emit('board:addLines', count))

    bus.on('player:move', (direction) => socket.send('player:move', direction))
    bus.on('network:connect', (serverURI, nick) => socket.connect(serverURI, nick))
    bus.on('board:change', (data) => socket.send('board:change', data))
    bus.on('board:clearLines', (count) => socket.send('board:clearLines', count))
    bus.on('board:lose', (data) => socket.send('board:lose', data))
    bus.on('network:disconnect', () => socket.disconnect())
    bus.on('game:join', (id) => socket.send('game:join', id))
    bus.on('game:start', () => socket.send('game:start'))
    bus.on('game:quit', () => socket.send('game:quit'))
  }
}
