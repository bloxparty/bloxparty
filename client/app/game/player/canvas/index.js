import clone from 'component-clone'
import Canvas from '../../../../canvas'
import dom from 'virtual-element'

let gridCanvas = null
let shapeCanvas = null

export const PlayerCanvas = { name: 'PlayerCanvas' }

PlayerCanvas.shouldUpdate = function shouldUpdate ({props}, nextProps) {
  if (props.isActive) return true
}

PlayerCanvas.render = function render ({props}) {
  const {canvasWidth, canvasHeight} = props

  return dom('div', {class: 'PlayerCanvas'}, [
    dom('canvas', {
      class: 'PlayerCanvas-canvas is-grid',
      id: 'grid',
      height: canvasHeight,
      width: canvasWidth
    }),
    dom('canvas', {
      class: 'PlayerCanvas-canvas is-shape',
      id: 'shape',
      height: canvasHeight,
      width: canvasWidth
    })
  ])
}

PlayerCanvas.afterRender = function afterRender ({props}, el) {
  const {isActive, isFirstPlayer, board} = props
  if (!gridCanvas) gridCanvas = Canvas(el.querySelector('.PlayerCanvas-canvas.is-grid'))
  if (!shapeCanvas) shapeCanvas = Canvas(el.querySelector('.PlayerCanvas-canvas.is-shape'))

  if (!isActive) {
    if (isFirstPlayer) {
      return shapeCanvas.drawText('Press \'S\' to start the game', {fillStyle: '#fff'})
    } else {
      return shapeCanvas.drawText('Waiting for next game to start...', {fillStyle: '#fff'})
    }
  }

  if (!board.grid.length || !board.currentShape) return
  const {currentX, currentY, currentShape, currentShapeVariant, grid} = board
  const currentVariant = currentShape.variants[currentShapeVariant]
  const color = currentShape.color
  const modifiedGrid = clone(grid)
  modifiedGrid.splice(0, 2)
  shapeCanvas.drawShape(currentX, currentY - 2, currentVariant, color)
  gridCanvas.drawGrid(modifiedGrid)
}

export default PlayerCanvas
