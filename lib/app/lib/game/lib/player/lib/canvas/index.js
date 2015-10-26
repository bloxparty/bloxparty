import Board from 'bloxparty-board'
import dom from 'virtual-element'

const name = 'PlayerCanvas'

function render (component) {
  let {props} = component
  let {width, height} = props

  return dom('div', {class: 'GamePlayerCanvas'}, [
    dom('canvas', {class: 'GamePlayerCanvas-canvas is-grid', id: 'grid', height: height, width: width}),
    dom('canvas', {class: 'GamePlayerCanvas-canvas is-shape', id: 'shape', height: height, width: width})
  ])
}

function afterUpdate (component, prevProps, prevState, setState) {
  let state = component.state
  let props = component.props
  let player = props.player
  let board = props.board
  if (!state.board || !player.board.grid) return
  if (player.game.players[0].id === player.id) {
    if (state.waiting && player.game.active) setState({waiting: false})
    if (state.waiting) return
    if (!player.game.active) {
      state.board.drawText('Press \'S\' to start the game')
      setState({waiting: true})
      return
    }
  } else {
    if (state.waiting && board.active) setState({waiting: false})
    if (state.waiting) return
    if (!board.active) {
      state.board.drawText('Waiting for next game to start...')
      setState({waiting: true})
      return
    }
  }
  state.board.sync(board)
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
