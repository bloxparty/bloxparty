import dom from 'virtual-element'
import Canvas from '../../../../canvas'
let canvas = null

export const ShapePreview = { name: 'ShapePreview' }

ShapePreview.render = function render ({props}) {
  const {canvasWidth, canvasHeight} = props

  return dom('div', {class: 'ShapePreview'}, [
    dom('canvas', {
      class: 'ShapePreview-canvas',
      height: canvasHeight,
      width: canvasWidth
    })
  ])
}

ShapePreview.afterRender = function afterRender ({props}, el) {
  if (!props.shape) return
  if (!canvas) canvas = Canvas(el.querySelector('.ShapePreview-canvas'), {rows: 4, columns: 4})
  const {shape} = props
  canvas.drawShape(0, 0, shape.variants[0], shape.color)
}

export default ShapePreview
