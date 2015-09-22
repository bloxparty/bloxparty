import bus from 'bus'
import element from 'virtual-element'
import canvas from '/lib/game/canvas'

function render (component, setState) {
  return element('div', {class: 'Preview-canvasContainer'}, [
    element('canvas', {class: 'Preview-canvas', height: 100, width: 100})
  ])
}

function afterRender (component, el) {
  canvas(el.children[0], component.props.board, {columns: 4, rows: 4}).drawPreview()
}

export default {render, afterRender}
