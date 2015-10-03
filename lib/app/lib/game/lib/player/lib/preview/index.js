import bus from 'bus'
import dom from 'virtual-element'
import Board from 'bloxparty-board'

const name = 'GamePlayerPreview'

function render (component) {
  return dom('div', {class: 'GamePlayerPreview'}, [
    dom('div', [
      dom('canvas', {class: 'GamePlayerPreview-canvas', height: 100, width: 100})
    ])
  ])
}

function afterMount (component, el, setState) {
  let board = Board({
    previewEl: el.querySelector('.GamePlayerPreview-canvas')
  })
  setState({board: board})
}

function afterRender (component, el) {
  let state = component.state
  let props = component.props
  if (!state.board || !props.board.queue) return
  state.board.queue = component.props.board.queue
  state.board.drawPreview()
}

export default {render, afterRender, afterMount, name}
