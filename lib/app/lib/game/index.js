import element from 'virtual-element'
import bus from 'bus'
import Controls from './lib/controls'
import Canvas from './lib/canvas'
import Preview from './lib/preview'
import Opponent from './lib/opponent'
import Winner from './lib/winner'

function quitGame (event) {
  bus.emit('game:quit')
}

function startGame (event) {
  bus.emit('game:start')
}

function render (component, setState) {
  let {client, visitHome, board} = component.props
  let game = client.game
  let gameName = null
  let playerCanvas = null
  let opponentCanvas = []
  let preview = null
  let winnerComponent = null
  let playerLevel = 0
  let activeLevel = 0

  if (!game) visitHome()

  if (game && game.players) {
    gameName = game.name
    activeLevel = game.activeLevel

    if (game.winnerName) winnerComponent = element(Winner, {name: game.winnerName})

    game.players.forEach(function (player, index) {
      if (player.id === client.id) {
        // preview = element(Preview, board)
        // playerLevel = board.level
        playerCanvas = element('div', {class: 'Game-playerBoard'}, [
          element('div', {class: 'Game-playerName'}, 'Player: ' + player.nick),
          element('div', {class: 'Game-playerCanvasContainer'}, [
            element(Canvas, {
              width: 250,
              height: 500,
              board: board
            })
          ])
        ])
      } else {
        opponentCanvas.push(element('div', {class: 'Game-opponentBoard'}, [
          element('div', {class: 'Game-opponentName'}, 'Player: ' + player.nick),
          element('div', {class: 'Game-opponentCanvasContainer'}, [
            element(Opponent, {
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
    element('div'),
    playerCanvas,
    element('div', {class: 'Game-playerControls'}, [
      element(Controls),
      preview,
      element('span', {class: 'Game-playerLevel'}, 'Player Level: ' + playerLevel),
      element('span', {class: 'Game-activeLevel'}, 'Active Level: ' + activeLevel),
      element('div', {class: 'Game-winner'}, [
        winnerComponent
      ])
    ]),
    element('div', {class: 'Game-opponents'}, [
      element('div', {}, [opponentCanvas])
    ]),
  ])
}

function sidebar (props) {
  let {client} = props
  let firstPlayer = null

  if (!client || !client.game) return

  if (client.game.players[0].id === client.id) firstPlayer = true

  let sidebarProps = {
    groups: [
      [
        {
          text: 'Game'
        },
        {
          text: 'Quit Game',
          action: quitGame
        }
      ]
    ]
  }

  if (firstPlayer) {
    sidebarProps.groups[0].splice(1, 0, {
      text: 'Start Game',
      action: startGame
    })
  }
  return sidebarProps
}

export default {render, sidebar}
