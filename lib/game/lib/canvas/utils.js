import shapes from 'staygrimm/bloxparty-board@master:shapes.js'

export default function render (el, data, opts) {
  opts = opts || {}
  var context = el.getContext('2d')
  var width = el.offsetWidth
  var height = el.offsetHeight
  var columns = opts.columns || 10
  var rows = opts.rows || 20
  var cellWidth = width / columns
  var cellHeight = height / rows
  var y = 0
  var x = 0

  function drawBoard () {
    context.clearRect(0, 0, el.offsetWidth, el.offsetHeight)
    renderGrid()
    if (!data || !data.grid || !data.grid.length) return
    context.strokeStyle = 'black'
    for (x = 0; x < 10; ++x) {
      for (y = 0; y < 20; ++y) {
        if (data.grid[y][x]) {
          context.fillStyle = data.grid[y][x]
          drawBlock(x, y)
        }
      }
    }
    if (!data.currentShape) return
    context.fillStyle = 'red'
    context.strokeStyle = 'black'
    for (y = 0; y < 4; ++y) {
      for (x = 0; x < 4; ++x) {
        if (data.currentShape.rotations[data.currentShapeRotation][y][x]) {
          context.fillStyle = data.currentShape.color
          drawBlock(data.currentX + x, data.currentY + y)
        }
      }
    }
  }

  function drawPreview () {
    if (!data.queue || !data.queue[0]) return
    var shape = data.queue[0]
    context.clearRect(0, 0, el.offsetWidth, el.offsetHeight)
    for (y = 0; y < 4; ++y) {
      for (x = 0; x < 4; ++x) {
        if (shapes[shape].rotations[0][y][x]) {
          context.fillStyle = shapes[shape].color
          drawBlock(x, y)
        }
      }
    }
  }

  function drawBlock (x, y) {
    context.fillRect(cellWidth * x, cellHeight * y, cellWidth, cellHeight)
    context.strokeRect(cellWidth * x, cellHeight * y, cellWidth, cellHeight)
  }

  function renderGrid () {
    var i = 0
    var location

    context.clearRect(0, 0, el.offsetHeight, el.offsetWidth)

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
    drawPreview: drawPreview
  }
}
