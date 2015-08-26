import element from 'dekujs/virtual-element'
import Controls from './lib/controls'
import Canvas from './lib/canvas'
import Preview from './lib/preview'

function render (component, setState) {
  let {client, visitHome} = component.props
  let game = client.game
  let gameName = null
  let playerCanvas = null
  let opponentCanvas = []
  let preview = null
  let winnerName = null

  if (!game) visitHome()

  if (game && game.players) {
    winnerName = game.winnerName
    gameName = game.name
    game.players.forEach(function (player, index) {
      if (player.id === client.id) {
        preview = element(Preview, player.board)
        playerCanvas = element('div', {class: 'Game-playerBoard'}, [
          element('div', {class: 'Game-playerName'}, 'Player: ' + player.nick),
          element('div', {class: 'Game-playerCanvasContainer'}, [
            element(Canvas, {
              width: 250,
              height: 500,
              player: player
            })
          ])
        ])
      } else {
        opponentCanvas.push(element('div', {class: 'Game-opponentBoard'}, [
          element('div', {class: 'Game-opponentName'}, 'Player: ' + player.nick),
          element('div', {class: 'Game-opponentCanvasContainer'}, [
            element(Canvas, {
              class: 'Game-opponentCanvas',
              width: 150,
              height: 300,
              player: player
            })
          ])
        ]))
      }
    })
  }

  return element('div', {class: 'Game'}, [
    element('h1', {class: 'Game-gameRoomName'}, 'Game Room: ' + gameName),
    playerCanvas,
    element('div', {class: 'Game-playerControls'}, [
      element(Controls),
      preview,
      element('div', {class: 'Game-winner'}, [
        element('h3', {class: 'Game-winnerHead'}, 'Winner:'),
        winnerName
      ])
    ]),
    element('div', {class: 'Game-opponents'}, [
      element('div', {}, [opponentCanvas])
    ]),
  ])
}

export default {render}
