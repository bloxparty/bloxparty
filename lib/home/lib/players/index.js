import bus from 'component/bus'
import element from 'dekujs/virtual-element'

function render (component, setState) {
  let {props} = component

  let players = props.players.map(function (player) {
    return element('li', {class: 'Players-listItem'}, [player.nick])
  })

  return element('div', {class: 'Players'}, [
    element('h2', {class: 'Players-head'}, ['Players']),
    element('div', {class: 'Players-listContainer'}, [
      element('ul', {class: 'Players-list'}, players)
    ])
  ])
}

export default {render}
