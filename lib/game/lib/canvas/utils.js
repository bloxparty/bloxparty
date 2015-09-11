import shapes from 'kvnneff/bloxparty-board@master:shapes.js'

export default function render (el, data, opts) {
  opts = opts || {}
  var context = el.getContext('2d')
  var width = el.offsetWidth
  var height = el.offsetHeight
  var columns = opts.columns || 10
  var rows = opts.rows || 20
  var cellWidth = width / columns
  var cellHeight = height / rows
  var bgColor = '#00202B'
  var y = 0
  var x = 0

  function drawBoard () {
    var t0 = performance.now();
    var translate = (context.lineWidth % 2) / 2
    context.setTransform(1, 0, 0, 1, 0, 0)
    context.translate(translate, translate)
    context.fillStyle = bgColor
    context.strokeStyle = bgColor
    context.clearRect(0, 0, el.offsetWidth, el.offsetHeight)
    context.fillRect(0, 0, el.offsetWidth, el.offsetHeight)
    // renderGrid()
    if (!data || !data.grid || !data.grid.length) return
    for (x = 0; x < 10; ++x) {
      for (y = 0; y < 20; ++y) {
        if (data.grid[y][x]) {
          drawBlock(x, y, data.grid[y][x])
        }
      }
    }
  }

  function drawShape () {
    var translate = (context.lineWidth % 2) / 2
    context.setTransform(1, 0, 0, 1, 0, 0)
    context.translate(translate, translate)
    context.strokeStyle = bgColor
    context.clearRect(0, 0, el.offsetWidth, el.offsetHeight)
    if (!data.currentShape) return
    for (y = 0; y < 4; ++y) {
      for (x = 0; x < 4; ++x) {
        if (data.currentShape.rotations[data.currentShapeRotation][y][x]) {
          drawBlock(data.currentX + x, data.currentY + y, data.currentShape.color)
        }
      }
    }
  }

  function drawPreview () {
    context.clearRect(0, 0, el.offsetWidth, el.offsetHeight)
    context.fillStyle = '#00202B'
    context.fillRect(0, 0, el.offsetWidth, el.offsetHeight)
    if (!data.queue || !data.queue[0]) return
    var shape = data.queue[0]
    for (y = 0; y < 4; ++y) {
      for (x = 0; x < 4; ++x) {
        if (shapes[shape].rotations[0][y][x]) {
          drawBlock(x, y, shapes[shape].color)
        }
      }
    }
  }

  function drawBlock (x, y, color) {
    context.fillStyle = color
    context.fillRect(cellWidth * x, cellHeight * y, cellWidth, cellHeight)
    context.strokeRect(cellWidth * x, cellHeight * y, cellWidth, cellHeight)
  }

  function renderGrid () {
    var i = 0
    var location
    var translate = (context.lineWidth % 2) / 2
    context.setTransform(1, 0, 0, 1, 0, 0)
    context.translate(translate, translate)
    context.strokeStyle = '#333'
    context.lineWidth = 1

    // Horizontal grid lines
    for (i = 0; i <= height; i += cellHeight) {
      location = Math.round(i)
      if (location === 0 && context.lineWidth > 1) location = 1
      context.beginPath()
      context.moveTo(0, location)
      context.lineTo(width, location)
      context.stroke()
    }

    // Vertical grid lines
    for (i = 0; i <= width; i += cellWidth) {
      location = Math.round(i)
      if (location === 0 && context.lineWidth > 1) location = 1
      context.beginPath()
      context.moveTo(location, 0)
      context.lineTo(location, height)
      context.stroke()
    }

    // Right grid border
    context.beginPath()
    context.moveTo(width - context.lineWidth, 0)
    context.lineTo(width - context.lineWidth, height)
    context.stroke()

    // Bottom grid border
    context.beginPath()
    context.moveTo(0, height - context.lineWidth)
    context.lineTo(width, height - context.lineWidth)
    context.stroke()
  }

  return {
    drawBoard: drawBoard,
    drawPreview: drawPreview,
    drawShape: drawShape
  }
}
