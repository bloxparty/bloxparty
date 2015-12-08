let clone = require('component-clone')

/**
   * Add 7000 shapes to the shapeQueue.  Ensures that there are no
   * duplicates in every 7 shapes
   * @return {Array}
   */
module.exports = function queue () {
  let available = ['I', 'J', 'L', 'O', 'S', 'T', 'Z']
  let shapes = []
  let tempShapes
  while (shapes.length < 700) {
    tempShapes = clone(available)
    while (tempShapes.length > 0) {
      let id = Math.floor(Math.random() * tempShapes.length)
      shapes.push(tempShapes[id])
      tempShapes.splice(id, 1)
    }
  }
  return shapes
}
