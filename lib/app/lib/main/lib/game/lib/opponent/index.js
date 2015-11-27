import dom from 'virtual-element'
import Board from 'bloxparty-board'

function render (component) {
  let props = component.props
  let width = props.width
  let height = props.height
  let player = props.player

  return dom('div', {class: 'col-xs-4 col-md-2 GameOpponent'}, [
    dom('div', {class: 'Box GameOpponent-box'}, [
      dom('div', {class: 'Box-head GameOpponent-name'}, player.nick),
      dom('div', {class: 'Box-content--no-padding'}, [
        dom('div', {class: 'GameOpponent-canvasContainer'}, [
          dom('canvas', {
            class: 'GameOpponent-canvas is-grid',
            height: height,
            width: width,
            'data-id': player.id
          }),
          dom('canvas', {
            class: 'GameOpponent-canvas is-shape',
            height: height,
            width: width,
            'data-id': player.id
          })
        ])
      ])
    ])
  ])
}

function afterMount (component, el, setState) {
  var board = Board({
    backgroundEl: el.querySelector('.GameOpponent-canvas.is-shape'),
    movementEl: el.querySelector('.GameOpponent-canvas.is-grid')
  })
  setState({board: board})
}

function afterRender (component, el) {
  let props = component.props
  let state = component.state
  if (!state.board || !props.player || !props.player.board) return
  state.board.sync(props.player.board)
  state.board.drawGrid()
}

export default {render, afterRender, afterMount}
