import bus from 'bus'
import io from 'socket.io-client'

/**
 * Socket Interface plugin for Deku
 * @param {Object} app Deku app object
 * @api public
 */
export default function SocketPlugin (app) {
  let socket = null

  app.set('err', '')

  bus.on('network:connect', (uri, playerName) => initSocket(uri, playerName))
  bus.on('network:disconnect', () => socket.disconnect())
  bus.on('board:change', (data) => socket.emit('board:change', data))
  bus.on('board:clearLines', (count) => socket.emit('board:clearLines', count))
  bus.on('board:lose', (data) => socket.emit('board:lose', data))
  bus.on('game:join', (id) => socket.emit('game:join', id))
  bus.on('game:start', () => socket.emit('game:start'))
  bus.on('game:quit', () => socket.emit('game:quit'))

  /**
   * Initialize a socket.io connection to `uri` with `playerName`
   * @param  {String} uri        Server uri
   * @param  {String} playerName Name of player
   * @api private
   */
  function initSocket (uri, playerName) {
    // HACK: to get socket.io to work with Electron
    if (uri.substr(7) !== 'http://') uri = 'http://' + uri

    socket = io(uri, {
      'forceNew': true,
      query: 'nick=' + playerName
    })

    socket.on('connect', () => app.set('connected', true))
    socket.on('disconnect', () => {
      app.set('connected', false)
      app.set('err', null)
    })
    socket.on('connect_error', () => app.set('err', 'Could not find server'))
    socket.on('err', (err) => app.set('err', err))
    socket.on('stats', (data) => app.set('stats', data))
    socket.on('client', (data) => app.set('client', data))
    socket.on('board:stop', () => bus.emit('board:stop'))
    socket.on('board:start', () => bus.emit('board:start'))
    socket.on('board:queue', (data) => bus.emit('board:queue', data))
    socket.on('board:grid', (data) => bus.emit('board:grid', data))
    socket.on('board:addLines', (count) => bus.emit('board:addLines', count))
  }
}
