import dom from 'virtual-element'

const name = 'PlayerList'

function render (component) {
  let props = component.props

  let players = props.players.map(function (player) {
    return dom('li', player.nick)
  })

  return dom('div', {class: 'Players'}, [
    dom('ul', {class: 'Players-listContainer'}, [
      players
    ])
  ])
}

export default {render, name}
