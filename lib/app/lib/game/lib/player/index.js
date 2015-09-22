import bus from 'bus'
import element from 'virtual-element'
import canvas from '/canvas'
import Preview from './lib/preview'

function render (component, setState) {
  let {props, state} = component
  let disabled = false
  let startButton = null
  let quitButton = null
  let preview = null
  let winner = ''

  if (props.game.winnerName) {
    setState({winner: props.game.winnerName})
    winner = props.game.winnerName
  }

  preview = element(Preview, props.player)
  quitButton = element('button', {onClick: quitGame, class: 'Button Game-quitButton'}, ['Quit Game'])

  if (props.game.players && props.game.players[0].id === props.client.id) {
    if (props.game.active || props.game.players.length === 1) disabled = true
    startButton = element('button', {onClick: startGame, class: 'Button Game-startButton', disabled: disabled}, ['Start Game'])
  }

  function startGame (event) {
    bus.emit('game:start')
  }

  function quitGame (event) {
    bus.emit('game:quit')
  }

  return element('div', {class: 'Grid Game-playerCanvasContainer'}, [
    element('div', {class: 'Grid-cell u-size4of6'}, [
      element('canvas', {class: 'Game-playerCanvas', height: 600, width: 300}),
    ]),
    element('div', {class: 'Grid-cell u-size2of6'}, [
      preview,
      startButton,
      quitButton,
      element('div', ['Winner:' + winner])
    ])
  ])
}

function afterRender (component, el) {
  canvas(el.querySelector('.Game-playerCanvas'), component.props.player.board).drawBoard()
}

export default {render, afterRender}
