import bus from 'bus'
import Board from 'bloxparty-board'
import element from 'virtual-element'
import utils from './utils'

let board = null

const name = 'PlayerCanvas'

function render (component) {
  let {props} = component
  let {width, height} = props
  return element('div', {class: 'Canvas-container'}, [
    element('canvas', {class: 'Canvas-canvas Canvas-grid', id: 'grid', height: height, width: width}),
    element('canvas', {class: 'Canvas-canvas Canvas-shape', id: 'shape', height: height, width: width}),
  ])
}

function afterUpdate (component) {
  if (!board || !component.props.board.grid) return
  let boardData = component.props.board
  board.sync(boardData)
  board.drawGrid()
  board.drawCurrentShape()
}

function afterMount (component, el, setState) {
  board = Board({
    backgroundEl: el.children[0],
    movementEl: el.children[1]
  })
}

export default {render, afterMount, afterUpdate, name}
