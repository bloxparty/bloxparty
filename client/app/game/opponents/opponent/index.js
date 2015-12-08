import arrayEqual from 'array-equal'
import clone from 'component-clone'
import dom from 'virtual-element'
import Canvas from '../../../../canvas'

let gridCanvas = null

export const Opponent = { name: 'Opponent' }

Opponent.shouldUpdate = function shouldUpdate ({props}, nextProps) {
  const {board, isActive} = props
  if (!isActive) return false
  if (arrayEqual(board.grid, nextProps.board.grid)) return true
}

Opponent.render = function render ({props}) {
  const {canvasWidth, canvasHeight, name, id} = props
  return dom('div', {class: 'col-xs-4 col-md-3 col-lg-2  Opponent'}, [
    dom('div', {class: 'Box Opponent-box'}, [
      dom('div', {class: 'Opponent-name Box-head'}, [
        dom('span', {class: 'Box-title'}, name ? name : 'Empty')
      ]),
      dom('div', {class: 'Box-content--no-padding'}, [
        dom('div', {class: 'Opponent-canvasContainer'}, [
          dom('canvas', {
            class: 'Opponent-canvas is-grid',
            height: canvasHeight,
            width: canvasWidth,
            'data-id': id
          })
        ])
      ])
    ])
  ])
}

Opponent.afterRender = function afterRender ({props}, el) {
  const {board} = props
  if (!board) return
  if (!gridCanvas) gridCanvas = Canvas(el.querySelector('.Opponent-canvas.is-grid'))
  const modifiedGrid = clone(board.grid)
  modifiedGrid.splice(0, 2)
  gridCanvas.drawGrid(modifiedGrid)
}

export default Opponent
