import uuid from 'uuid'
import shapes from 'bloxparty-shapes'
import Emitter from 'component-emitter'
import clone from 'component-clone'

/**
 * Export `Board`
 */
module.exports = Board

/**
 * Initalize `Board` with `attrs`
 * @param {Object} attrs
 * @return {Board}
 *
 */
function Board (attrs) {
  if (!(this instanceof Board)) return new Board(attrs)
  attrs = attrs || {}
  this.id = uuid()
  this.rows = attrs.rows || 22
  this.columns = attrs.columns || 10
  this.grid = attrs.grid || []
  this.currentShapeVariant = 0
  this.currentShape = null
  this.queue = []
  this.currentX = 3
  this.currentY = 0
  this.lost = false
  this.active = false
  this.quit = false
  this.timeout = null
  this.lineCount = 0
  this.level = 0
  this.clearGrid()
  return this
}

/**
 * Mixins
 */
Emitter(Board.prototype)

/**
 * Start this board
 * @api public
 */
Board.prototype.start = function start () {
  this.tick()
  this.active = true
  this.emit('change')
  this.emit('start')
}

/**
 * Stop this board
 * @api public
 */
Board.prototype.stop = function stop () {
  clearTimeout(this.timeout)
  this.endLoop = true
  this.timeout = null
  this.active = false
  this.emit('change')
}

/**
 * Grab next shape from queue
 * @api private
 */
Board.prototype.nextShape = function nextShape () {
  this.currentShapeVariant = 0
  this.currentX = 3
  this.currentY = 0
  this.currentShape = shapes[this.queue.shift()]
  this.emit('new shape')
  this.emit('change')
}

/**
 * Attempt to move shape in `direction`
 * @param  {String} direction Direction to move
 * @return {Boolean}           Return true if successful
 */
Board.prototype.move = function move (direction) {
  return this[direction]()
}

/**
 * Game loop
 * @return {Function} Returns `this.lose()` if a block rests at the very top of the grid
 */
Board.prototype.tick = function tick () {
  const self = this
  let valid = null

  if (!this.currentShape) {
    this.nextShape()
    valid = true
  } else {
    valid = this.move('down')
  }

  if (!valid) {
    if (this.currentY === 0) return this.lose()
    this.freeze()
    this.clearLines()
    this.nextShape()
  }

  this.setFallRate()
  this.emit('change')
  this.timeout = setTimeout(function () {
    self.tick()
  }, this.fallRate)
}

/**
 * Set the fall rate of current shape
 */
Board.prototype.setFallRate = function setFallRate () {
  this.fallRate = (11 - this.level) * 50
}

/**
 * Return a JSON representation of this board
 * @return {JSON} JSON Object
 */
Board.prototype.json = function json () {
  const obj = {
    queue: this.queue,
    grid: this.grid,
    currentShapeVariant: this.currentShapeVariant,
    currentShape: this.currentShape,
    currentX: this.currentX,
    currentY: this.currentY,
    level: this.level,
    active: this.active
  }

  return obj
}

/**
 * Stop shape at its position and fix it to board
 * @api private
 */
Board.prototype.freeze = function freeze () {
  for (let y = 0; y < 4; ++y) {
    for (let x = 0; x < 4; ++x) {
      if (this.currentShape.variants[this.currentShapeVariant][y][x]) {
        this.grid[ y + this.currentY ][ x + this.currentX ] = this.currentShape.color
      }
    }
  }
  this.emit('grid')
  this.emit('change')
}

/**
 * Clear this player's board
 * @api private
 */
Board.prototype.clearGrid = function clearGrid () {
  for (let y = 0; y < this.rows; ++y) {
    this.grid[y] = []
    for (let x = 0; x < this.columns; ++x) {
      this.grid[y][x] = 0
    }
  }
  this.emit('change')
}

/**
 * Check if any lines are filled and clear them
 * @api private
 */
Board.prototype.clearLines = function clearLines () {
  const length = this.rows - 1
  let lineCount = 0
  let x = 0
  let y = 0

  for (y = length; y >= 0; --y) {
    let rowFilled = true
    for (x = 0; x < this.columns; ++x) {
      if (this.grid[y][x] === 0) {
        rowFilled = false
        break
      }
    }
    if (rowFilled) {
      for (let yy = y; yy > 0; --yy) {
        for (x = 0; x < this.columns; ++x) {
          this.grid[yy][x] = this.grid[yy - 1][x]
        }
      }
      ++y
      ++lineCount
    }
  }

  if (lineCount > 0) {
    this.emit('clear lines', lineCount)
    this.lineCount = this.lineCount + lineCount
  }

  if (this.lineCount <= 0) this.level = 1
  if ((this.lineCount >= 1) && (this.lineCount <= 90)) this.level = Math.floor(1 + ((this.lineCount - 1) / 5))
  if (this.lineCount >= 91) this.level = 10
  this.emit('grid')
  this.emit('change')
}

/**
 * Move the current piece down
 * @return {Boolean} Returns true if successful
 */
Board.prototype.down = function down () {
  if (!this.validateMove(0, 1)) return false
  ++this.currentY
  this.emit('change')
  return true
}

/**
 * Move the current piece right
 * @return {Boolean} Returns true if successful
 */
Board.prototype.right = function right () {
  if (!this.validateMove(1)) return false
  ++this.currentX
  this.emit('change')
  return true
}

/**
 * Move the current piece left
 * @return {Boolean} Returns true if successful
 */
Board.prototype.left = function left () {
  if (!this.validateMove(-1)) return false
  --this.currentX
  this.emit('change')
  return true
}

/**
 * Move the current piece down until it settles
 * @return {Boolean} Returns true if successful
 */
Board.prototype.drop = function drop () {
  while (this.validateMove(0, 1)) {
    ++this.currentY
  }
  this.emit('change')
  return true
}

/**
 * Rotate the current piece
 * @return {Boolean} Returns true if successful
 */
Board.prototype.rotate = function rotate () {
  const rotation = this.currentShapeVariant === 3 ? 0 : this.currentShapeVariant + 1
  const shape = this.currentShape.variants[rotation]
  if (!this.validateMove(0, 0, shape)) return false
  this.currentShapeVariant = rotation
  this.emit('change')
  return true
}

/**
 * Add `count` garbage lines to this board
 * @param {Number} count Number of lines to add
 * @api public
 */
Board.prototype.addLines = function addLines (count) {
  const newGrid = clone(this.grid)
  let x = 0
  while (count > 0) {
    const first = newGrid.shift()
    for (x = 0; x < this.columns; ++x) {
      if (first[x] !== 0) {
        this.lose()
        break
      }
    }
    newGrid.push(this.randomLine())
    count--
  }
  this.grid = newGrid
  this.emit('grid')
  this.emit('change')
}

/**
 * Generate a random garbage line
 * @return {Array} 2d Array
 * @api public
 */
Board.prototype.randomLine = function randomLine () {
  const line = []
  const colors = Object.keys(shapes).map(function (shape) {
    return shapes[shape].color
  })

  let length = this.columns
  let missingBlocks = 2

  while (length > 0) {
    const color = colors[Math.floor(Math.random() * colors.length)]
    line.push(color)
    --length
  }

  while (missingBlocks > 0) {
    const cellIndex = Math.floor(Math.random() * line.length)
    if (line[cellIndex]) {
      line[cellIndex] = 0
      --missingBlocks
    }
  }
  return line
}

/**
 * Checks if the resulting position of current shape will be feasible
 * @param  {Number} offsetX
 * @param  {Number} offsetY
 * @param  {Array} shape Supply a shape other than the current shape to validate
 * @return {Boolean}
 */
Board.prototype.validateMove = function validateMove (offsetX, offsetY, shape) {
  shape = shape || this.currentShape.variants[this.currentShapeVariant]
  offsetX = offsetX || 0
  offsetY = offsetY || 0
  offsetX = this.currentX + offsetX
  offsetY = this.currentY + offsetY

  for (let y = 0; y < 4; ++y) {
    for (let x = 0; x < 4; ++x) {
      if (shape[y][x]) {
        if (typeof this.grid[y + offsetY] === 'undefined' ||
          typeof this.grid[y + offsetY][x + offsetX] === 'undefined' ||
          this.grid[y + offsetY][x + offsetX] ||
          x + offsetX < 0 ||
          y + offsetY >= this.rows ||
          x + offsetX >= this.columns) {
          return false
        }
      }
    }
  }
  return true
}

/**
 * Mark this board as `lost`
 * @api public
 */
Board.prototype.lose = function lose () {
  this.lost = true
  this.stop()
  this.emit('lose')
}

/**
 * Emit error with `msg`
 * @param  {String} msg
 * @api private
 */
Board.prototype.error = function error (msg) {
  this.emit('error', new Error(msg))
}

/**
 * Reset the board
 * @api public
 */
Board.prototype.reset = function reset () {
  clearTimeout(this.timeout)
  this.endLoop = true
  this.level = 0
  this.currentY = 0
  this.currentX = 3
  this.currentShape = null
  this.currentShapeVariant = null
  this.lineCount = 0
  this.lost = false
  this.clearGrid()
  this.emit('grid')
  this.emit('change')
  this.emit('reset')
}

/**
 * Generate and return a random grid
 * @param  {Object} opts
 * @return {Array}
 */
Board.randomGrid = function randomGrid (opts) {
  opts = opts || {}
  const rows = opts.rows || 20
  const cols = opts.cols || 10
  const grid = []
  const colors = []

  for (const shape in shapes) { colors.push(shapes[shape].color) }

  for (let x = 0; x < rows; ++x) {
    const columns = []
    for (let y = 0; y < cols; ++y) {
      columns[y] = colors[Math.floor(Math.random() * colors.length)]
    }
    grid[x] = columns
  }

  return grid
}
