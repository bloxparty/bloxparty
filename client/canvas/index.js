var wrapper = require('canvas-text-wrapper').CanvasTextWrapper
var c = require('color')

module.exports = function wrapCanvas (canvas, options) {
  options = options || {}
  var columns = options.columns || 10
  var rows = options.rows || 20
  var context = canvas.getContext('2d')
  var translate = (context.lineWidth % 2) / 2
  var canvasWidth = canvas.offsetWidth
  var canvasHeight = canvas.offsetHeight
  var cellWidth = canvasWidth / columns
  var cellHeight = cellWidth
  var innerWidth = cellWidth - (cellWidth * 0.1) * 2
  var innerHeight = innerWidth
  var bevelWidth = cellWidth * 0.1

  context.setTransform(1, 0, 0, 1, 0, 0)
  context.translate(translate, translate)
  context.imageSmoothingEnabled = false
  context.save()

  /**
   * Render `grid` to a canvas element
   * @param  {Array} grid   Grid array
   */
  function drawGrid (grid) {
    var batch = {}
    var y = 0
    var x = 0

    for (x = 0; x < columns; ++x) {
      for (y = 0; y < rows; ++y) {
        if (grid[y][x]) {
          var cellColor = grid[y][x]
          var topLeftBevelColor = c(cellColor).lighten(0.6).rgbString()
          var bottomRightBevelColor = c(cellColor).darken(0.5).rgbString()
          var cellX = cellWidth * x
          var cellY = cellHeight * y
          var innerX = cellX + (cellWidth * 0.1)
          var innerY = cellY + (cellHeight * 0.1)

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
    for (var color in batch) {
      context.fillStyle = color
      batch[color].forEach(function (operation) {
        if (operation.type === 'inner') drawInnerSquare(context, operation)
        if (operation.type === 'topLeftBevel') drawTopLeftBevel(context, operation)
        if (operation.type === 'bottomRightBevel') drawBottomRightBevel(context, operation)
      })
    }
  }

  function drawShape (startingX, startingY, shape, color) {
    var topLeftBevelColor = c(color).lighten(0.6).rgbString()
    var bottomRightBevelColor = c(color).darken(0.5).rgbString()
    var x = 0
    var y = 0

    context.clearRect(-1, -1, canvasWidth + 1, canvasHeight + 1)

    for (y = 0; y < 4; ++y) {
      for (x = 0; x < 4; ++x) {
        if (shape[y][x]) {
          var cellX = cellWidth * (startingX + x)
          var cellY = (cellHeight * (startingY + y))
          var innerX = cellX + (cellWidth * 0.1)
          var innerY = cellY + (cellHeight * 0.1)

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
    for (var prop in options) {
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
  var x = props.x
  var y = props.y
  var cellWidth = props.cellWidth
  var cellHeight = props.cellHeight
  var bevelWidth = props.bevelWidth

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
  var x = props.x
  var y = props.y
  var cellWidth = props.cellWidth
  var cellHeight = props.cellHeight
  var bevelWidth = props.bevelWidth

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
