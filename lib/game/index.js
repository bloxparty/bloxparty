import bus from 'component/bus'
import element from 'dekujs/virtual-element'
import Controls from './lib/controls'
import Canvas from './lib/canvas'
import Preview from './lib/preview'

function render (component, setState) {
  let {client, visitHome} = component.props
  let game = client.game
  let playerCanvas = null
  let opponentCanvas = []
  let disabled = false
  let startButton = null
  let preview = null

  if (!game) visitHome()

  function startGame (event) {
    bus.emit('game:start')
  }

  function quitGame (event) {
    bus.emit('game:quit')
  }

  if (game && game.players) {
    game.players.forEach(function (player, index) {
      if (player.id === client.id) {
        preview = element(Preview, player.board)
        playerCanvas = element(Canvas, {width: 300, height: 600, player: player})
        if (game.players && game.players[0].id === client.id) {
          if (game.active || game.players.length === 1) disabled = true
          startButton = element('button', {
            onClick: startGame,
            class: 'Button Game-startButton',
            disabled: disabled
          }, ['Start Game'])
        }
      } else {
        opponentCanvas.push(element(Canvas, {width: 200, height: 400, player: player}))
      }
    })
  }

  return element('div', {class: 'Game'}, [
    element('div', {class: 'Grid'}, [
      element('div', {class: 'Grid-cell u-sizeFit'}, [playerCanvas]),
      element('div', {class: 'Grid-cell u-size1of6 Game-playerControls'}, [
        startButton,
        preview,
        element('button', {onClick: quitGame, class: 'Button Game-quitButton'}, ['Quit Game'])
      ]),
      element('div', {class: 'Grid-cell u-size3of6'}, [
        element('div', {class: 'Grid'}, opponentCanvas)
      ])
    ]),
    element(Controls)
  ])
}

export default {render}
