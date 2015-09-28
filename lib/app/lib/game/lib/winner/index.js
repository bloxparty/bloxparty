import bus from 'bus'
import element from 'virtual-element'

const name = 'Winner'

/**
 * Winner Name Component
 */
function render (component) {
  let {winnerName} = component.props

  return element('div', {class: 'Game-winner'}, [
    element('h3', {class: 'Game-winnerHead'}, 'Winner:'),
    winnerName
  ])
}

export default {render, name}
