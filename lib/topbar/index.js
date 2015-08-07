import element from 'dekujs/virtual-element'

function render () {
  return element('div', {class: 'Topbar'}, [
    element('span', ['Blox Party!'])
  ])
}

export default {render}
