import bus from 'bus'
import Board from 'bloxparty-board'

/**
 * Blox Party Board plugin for Deku
 * @param {Object} app Deku app object
 */
export default function BoardPlugin (app) {
  let board = Board()

  app.set('board', board.json())

  board.on('lose', () => bus.emit('board:lose'))
  board.on('clear lines', (count) => bus.emit('board:clearLines', count))
  board.on('change', () => {
    bus.emit('board:change', board.json())
    app.set('board', board.json())
  })

  bus.on('player:move', (direction) => board.move(direction))
  bus.on('board:stop', () => board.stop())
  bus.on('board:queue', (data) => board.set('queue', data))
  bus.on('board:addLines', (count) => board.addLines(count))
  bus.on('board:start', function () {
    board.reset()
    board.start()
  })

  bus.on('game:quit', function () {
    board.queue = []
    board.stop()
    board.reset()
  })

  bus.on('game:stop', function () {
    board.queue = []
    board.stop()
  })

  bus.on('network:disconnect', function () {
    board.stop()
    board.reset()
  })
}
