import bus from 'bus'
import Board from 'bloxparty-board'
import element from 'virtual-element'
import utils from './utils'

function render (component) {
  let {props} = component
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

  board.on('change', function () {
    bus.emit('board:change', board.json())
  })

  board.on('lose', function () {
    bus.emit('board:lose')
  })

  bus.on('player:move', function (direction) {
    board.move(direction)
  })

  bus.on('board:start', function () {
    board.reset()
    board.render()
    board.start()
  })

  bus.on('board:stop', function () {
    board.stop()
  })

  bus.on('board:addLines', function (count) {
    board.addLines(count)
  })

  bus.on('board:queue', function (data) {
    console.log(data)
    board.queue = data
  })

  bus.on('client', function (data) {
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

export default {render, afterMount}
