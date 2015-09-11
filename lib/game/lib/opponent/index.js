import element from 'dekujs/virtual-element'
import utils from '../canvas/utils'

function render (component, setState) {
  let {props, state} = component
  let {width, height} = props

  return element('div', {class: 'OpponentCanvas-container'}, [
    element('canvas', {class: 'OpponentCanvas-canvas', height: height, width: width}),
  ])
}

function afterRender (component, el) {
  utils(el.children[0], component.props.player.board).drawBoard()
}

export default {render, afterRender}
