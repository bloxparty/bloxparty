import {CanvasTextWrapper as wrapper} from 'canvas-text-wrapper'
import c from 'color'

/**
 * Wrap a `canvas` element with some drawing utilities
 * @param  {DOM} canvas  Canvas element
 * @param  {Object} options
 * @return {Object}
 */
export default function wrapCanvas (canvas, options) {
  options = options || {}
  const columns = options.columns || 10
  const rows = options.rows || 20
  const context = canvas.getContext('2d')
  const translate = (context.lineWidth % 2) / 2
  const canvasWidth = canvas.offsetWidth
  const canvasHeight = canvas.offsetHeight
  const cellWidth = canvasWidth / columns
  const cellHeight = cellWidth
  const innerWidth = cellWidth - (cellWidth * 0.1) * 2
  const innerHeight = innerWidth
  const bevelWidth = cellWidth * 0.1

  context.setTransform(1, 0, 0, 1, 0, 0)
  context.translate(translate, translate)
  context.imageSmoothingEnabled = false
  context.save()

  /**
   * Render `grid` to a canvas element
   * @param  {Array} grid   Grid array
   */
  function drawGrid (grid) {
    const batch = {}
    let y = 0
    let x = 0

    for (x = 0; x < columns; ++x) {
      for (y = 0; y < rows; ++y) {
        if (grid[y][x]) {
          let cellColor = grid[y][x]
          let topLeftBevelColor = c(cellColor).lighten(0.6).rgbString()
          let bottomRightBevelColor = c(cellColor).darken(0.5).rgbString()
          let cellX = cellWidth * x
          let cellY = cellHeight * y
          let innerX = cellX + (cellWidth * 0.1)
          let innerY = cellY + (cellHeight * 0.1)

          if (!batch[cellColor]) batch[cellColor] = []
          if (!batch[topLeftBevelColor]) batch[topLeftBevelColor] = []
          if (!batch[bottomRightBevelColor]) batch[bottomRightBevelColor] = []

          batch[cellColor].push({
            type: 'inner',
            innerX: innerX,
            innerY: innerY,
            innerWidth: innerWidth,
            innerHeight: innerHeight
          })

          batch[topLeftBevelColor].push({
            type: 'topLeftBevel',
            bevelWidth: bevelWidth,
            x: cellX,
            y: cellY,
            cellWidth: cellWidth,
            cellHeight: cellHeight
          })

          batch[bottomRightBevelColor].push({
            type: 'bottomRightBevel',
            bevelWidth: bevelWidth,
            x: cellX,
            y: cellY,
            cellWidth: cellWidth,
            cellHeight: cellHeight
          })
        }
      }
    }

    context.clearRect(0, -1, canvasWidth, canvasHeight + 1)

    // Draw in batches by color because changing the context.fillStyle has performance costs
    for (let color in batch) {
      context.fillStyle = color
      batch[color].forEach((operation) => {
        if (operation.type === 'inner') drawInnerSquare(context, operation)
        if (operation.type === 'topLeftBevel') drawTopLeftBevel(context, operation)
        if (operation.type === 'bottomRightBevel') drawBottomRightBevel(context, operation)
      })
    }
  }

  function drawShape (startingX, startingY, shape, color) {
    const topLeftBevelColor = c(color).lighten(0.6).rgbString()
    const bottomRightBevelColor = c(color).darken(0.5).rgbString()
    let x = 0
    let y = 0

    context.clearRect(-1, -1, canvasWidth + 1, canvasHeight + 1)

    for (y = 0; y < 4; ++y) {
      for (x = 0; x < 4; ++x) {
        if (shape[y][x]) {
          let cellX = cellWidth * (startingX + x)
          let cellY = (cellHeight * (startingY + y))
          let innerX = cellX + (cellWidth * 0.1)
          let innerY = cellY + (cellHeight * 0.1)

          context.fillStyle = color
          drawInnerSquare(context, {
            innerX: innerX,
            innerY: innerY,
            innerWidth: innerWidth,
            innerHeight: innerHeight
          })
          context.fillStyle = topLeftBevelColor
          drawTopLeftBevel(context, {
            bevelWidth: bevelWidth,
            x: cellX,
            y: cellY,
            cellWidth: cellWidth,
            cellHeight: cellHeight
          })
          context.fillStyle = bottomRightBevelColor
          drawBottomRightBevel(context, {
            bevelWidth: bevelWidth,
            x: cellX,
            y: cellY,
            cellWidth: cellWidth,
            cellHeight: cellHeight
          })
        }
      }
    }
  }

  /**
   * Draw `text` on the canvas
   * @param  {String} text Text to draw
   * @param {Object} options  Options object
   */
  function drawText (text, options) {
    options = options || {}
    for (let prop in options) {
      context[prop] = options[prop]
    }
    wrapper(canvas, text, {
      verticalAlign: 'middle',
      textAlign: 'center'
    })
    context.restore()
  }

  return {
    drawGrid: drawGrid,
    drawShape: drawShape,
    drawText: drawText
  }
}

/**
 * Draw the inner square of a block
 * @param  {CanvasContext} context Context to draw on
 * @param  {Object} props Drawing properties
 */
function drawInnerSquare (context, props) {
  context.fillRect(props.innerX, props.innerY, props.innerWidth, props.innerHeight)
}

/**
 * Draw the top and left bevel of a block
 * @param  {CanvasContext} context Context to draw on
 * @param  {Object} props Drawing properties
 */
function drawTopLeftBevel (context, props) {
  const x = props.x
  const y = props.y
  const cellWidth = props.cellWidth
  const cellHeight = props.cellHeight
  const bevelWidth = props.bevelWidth

  context.beginPath()
  context.moveTo(x, y)
  context.lineTo(x + cellWidth, y)
  context.lineTo(x + cellWidth - bevelWidth, y + bevelWidth)
  context.lineTo(x + bevelWidth, y + bevelWidth)
  context.lineTo(x + bevelWidth, y + cellHeight - bevelWidth)
  context.lineTo(x, y + cellHeight)
  context.closePath()
  context.fill()
}

/**
 * Draw the bottom and right bevel of a block
 * @param  {CanvasContext} context Context to draw on
 * @param  {Object} props   Drawing properties
 */
function drawBottomRightBevel (context, props) {
  const x = props.x
  const y = props.y
  const cellWidth = props.cellWidth
  const cellHeight = props.cellHeight
  const bevelWidth = props.bevelWidth

  context.beginPath()
  context.moveTo(x + cellWidth, y)
  context.lineTo(x + cellWidth, y + cellHeight)
  context.lineTo(x, y + cellHeight)
  context.lineTo(x + bevelWidth, y + cellHeight - bevelWidth)
  context.lineTo(x + cellWidth - bevelWidth, y + cellHeight - bevelWidth)
  context.lineTo(x + cellWidth - bevelWidth, y + bevelWidth)
  context.closePath()
  context.fill()
}
