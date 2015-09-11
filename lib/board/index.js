import bus from 'component/bus'
import Board from 'kvnneff/bloxparty-board@master'

export default function plugin () {
  return function (app) {
    var board = new Board()
    var moveCount = 0
    var requests = []

    app.set('board-client', board.json())
    board.on('change', function () {
      app.set('board-client', board.json())
    })
    bus.on('player:move', function (direction) {
      board.move(direction)
      moveCount = moveCount + 1
      requests.push({id: moveCount, direction: direction})
    })
    bus.on('board:start', function () {
      moveCount = 0
      board.reset()
      board.newShape()
      board.start()
    })
    bus.on('client', function (data) {
      requests = requests.filter(function (req) {
        return req.moveCount > moveCount
      })
      board.queue = data.board.queue
      // board.grid = data.board.grid
      // board.currentShapeRotation = data.board.currentShapeRotation
      // board.currentShape = data.board.currentShape
      // board.currentX = data.board.currentX
      // board.currentY = data.board.currentY
      // requests.forEach(function (req) {
      //   board.move(req.direction)
      // })
    })
    bus.on('game:stop', function () {
      board.stop()
    })
  }
}
