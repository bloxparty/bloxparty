import element from 'virtual-element'
import utils from '../canvas/utils'
import Board from 'bloxparty-board'

let board = null

function render (component, setState) {
  let {props, state} = component
  let {width, height} = props

  return element('div', {class: 'OpponentCanvas-container'}, [
    element('canvas', {
      class: 'OpponentCanvas-canvas OpponentCanvas-grid',
      height: height,
      width: width,
      'data-id': component.props.player.id
    }),
    element('canvas', {
      class: 'OpponentCanvas-canvas OpponentCanvas-shape',
      height: height,
      width: width,
      'data-id': component.props.player.id
    }),
  ])
}

function afterRender (component, el) {
  board = Board({
    backgroundEl: el.children[0],
    movementEl: el.children[1]
  })

  board.sync(component.props.player.board)
  board.drawGrid()
}

export default {render, afterRender}
