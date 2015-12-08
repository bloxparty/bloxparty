import bus from 'bus'
import Board from '../../server/board'
import events from '../../server/events'

/**
 * Blox Party Board plugin for Deku
 * @param {Object} app Deku app object
 */
export default function BoardPlugin (app) {
  const board = Board()
  app.set('board', board.json())
  board.on('change', () => {
    const boardJson = board.json()
    app.set('board', boardJson)
    bus.emit(events.client.sendBoard, boardJson)
  })
  board.on('lose', () => bus.emit(events.board.lose))
  board.on('clear lines', (count) => bus.emit(events.client.clearLine, count))

  bus.on(events.board.move, (direction) => board.move(direction))
  bus.on(events.board.stop, () => board.stop())
  bus.on(events.board.queue, (data) => board.queue = data)
  bus.on(events.server.addLines, (count) => board.addLines(count))
  bus.on(events.server.startGame, () => {
    board.reset()
    board.start()
  })

  bus.on(events.client.quitGame, function () {
    board.queue = []
    board.stop()
    board.reset()
  })

  bus.on(events.client.stopGame, function () {
    board.queue = []
    board.stop()
  })

  bus.on(events.client.signOut, function () {
    board.stop()
    board.reset()
  })
}
