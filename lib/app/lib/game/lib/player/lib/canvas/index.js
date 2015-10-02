import bus from 'bus'
import Board from 'bloxparty-board'
import dom from 'virtual-element'

const name = 'PlayerCanvas'

function render (component) {
  let {props} = component
  let {width, height} = props
  return dom('div', {class: 'GamePlayerCanvas'}, [
    dom('canvas', {class: 'GamePlayerCanvas-canvas is-grid', id: 'grid', height: height, width: width}),
    dom('canvas', {class: 'GamePlayerCanvas-canvas is-shape', id: 'shape', height: height, width: width}),
  ])
}

function afterUpdate (component) {
  let state = component.state
  let props = component.props
  if (!state.board || !props.board.grid) return
  state.board.sync(props.board)
  state.board.drawGrid()
  state.board.drawCurrentShape()
}

function afterMount (component, el, setState) {
  let board = Board({
    backgroundEl: el.children[0],
    movementEl: el.children[1]
  })

  setState({board: board})
}

export default {render, afterMount, afterUpdate, name}
