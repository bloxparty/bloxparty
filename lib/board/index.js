import bus from 'bus'
import Board from 'bloxparty-board'

/**
 * Board Plugin
 */
export default function plugin () {
  return function (app) {
    let board = Board()

    app.set('board', board.json())

    board.on('change', () => {
      bus.emit('board:change', board.json())
      app.set('board', board.json())
    })
    board.on('lose', () => bus.emit('board:lose'))
    board.on('clear lines', (count) => bus.emit('board:clearLines', count))
    bus.on('player:move', (direction) => board.move(direction))
    bus.on('board:stop', () => board.stop())
    bus.on('board:queue', (data) => board.set('queue', data))
    bus.on('board:grid', (data) => board.set('grid', data))
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
  }
}