import bus from 'component/bus'
import Board from 'kvnneff/bloxparty-board@master'
import element from 'dekujs/virtual-element'
import utils from './utils'

function render (component) {
  let {props, state} = component
  let {width, height} = props

  return element('div', {class: 'Canvas-container'}, [
    element('canvas', {class: 'Canvas-canvas Canvas-grid', id: 'grid', height: height, width: width}),
    element('canvas', {class: 'Canvas-canvas Canvas-shape', id: 'shape', height: height, width: width}),
  ])
}

function afterMount (component, el, setState) {
  var board = Board({
    backgroundEl: el.children[0],
    movementEl: el.children[1]
  })
  var moveCount = 0
  var requests = []
  var newData = null

  function draw () {
    board.drawGrid()
    board.drawCurrentShape()
  }

  bus.on('player:move', function (direction) {
    board.move(direction)
    moveCount = moveCount + 1
    requests.push({id: moveCount, direction: direction})
  })

  bus.on('board:start', function () {
    moveCount = 0
    board.reset()
    board.start()
  })

  bus.on('client', function (data) {
    newData = data
  })
  bus.on('game:quit', function () {
    board.stop()
    board.reset()
  })
  bus.on('game:stop', function () {
    board.stop()
  })

  var time
  var fps = 30
  var now
  var then = Date.now()
  var interval = 1000 / fps
  var dt
  function loop (timestamp) {
    requestAnimationFrame(loop)
    now = Date.now()
    dt = now - then
    if (dt > interval){
      requests = requests.filter(function (req) {
        return req.moveCount > newData.moveCount
      })
      board.sync(newData.board)
      requests.forEach(function (req) {
        board.move(req.direction)
      })

      draw()
      then = now - (dt % interval)
    }
  }
  loop()
}


export default {render, afterMount}
