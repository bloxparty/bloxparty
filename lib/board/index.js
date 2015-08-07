import bus from 'component/bus'
import Board from 'staygrimm/bloxparty-board@master'

export default function plugin () {
  return function (app) {
    var board = new Board()

    app.set('board', board.json())
    board.on('change', function () {
      app.set('board', board.json())
    })
    bus.on('player:move', function (direction) {
      board.move(direction)
    })
    bus.on('game:begin', function () {
      board.start()
    })
    bus.on('client', function (data) {
      board.sync(data.board)
    })
    bus.on('game:stop', function () {
      board.stop()
    })
  }
}
