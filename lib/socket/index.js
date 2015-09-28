import bus from 'bus'
import Socket from './socket'

export default function SocketPlugin () {
  return function (app) {
    let socket = Socket()

    let stats = {
      games: [],
      players: []
    }

    app.set('stats', stats)
    app.set('err', '')

    socket.on('connected', function () {
      app.set('connected', true)
      app.set('err', null)
      bindListeners()
    })

    bus.on('player:move', (direction) => socket.send('player:move', direction))
    bus.on('network:connect', (serverURI, nick) => socket.connect(serverURI, nick))
    bus.on('board:change', (data) => socket.send('board:change', data))
    bus.on('board:clearLines', (count) => socket.send('board:clearLines', count))
    bus.on('board:lose', (data) => socket.send('board:lose', data))
    bus.on('network:disconnect', () => socket.disconnect())
    bus.on('game:join', (id) => socket.send('game:join', id))
    bus.on('game:start', () => socket.send('game:start'))
    bus.on('game:quit', () => socket.send('game:quit'))

    function bindListeners () {
      socket.addListener('connect_error', () => app.set('err', 'Could not find server'))

      socket.addListener('err', (err) => app.set('err', err))
      socket.addListener('disconnect', () => app.set('connected', false))
      socket.addListener('stats', (data) => app.set('stats', data))
      socket.addListener('client', function (data) {
        bus.emit('client', data)
        app.set('client', data)
      })
      socket.addListener('board:stop', () => bus.emit('board:stop'))
      socket.addListener('board:start', () => bus.emit('board:start'))
      socket.addListener('board:queue', (data) => bus.emit('board:queue', data))
      socket.addListener('board:grid', (data) => bus.emit('board:grid', data))
      socket.addListener('board:addLines', (count) => bus.emit('board:addLines', count))
    }
  }
}