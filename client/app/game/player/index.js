import dom from 'virtual-element'
import shapes from 'bloxparty-shapes'
import Canvas from './canvas'
import Preview from './preview'
import Status from './status'
import Controls from './controls'

export const Player = { name: 'Player' }

Player.render = function render ({props}) {
  const {isActive, isFirstPlayer, player, board, canvasWidth, canvasHeight, events} = props
  const nextShape = shapes[board.queue[0]]
  const PreviewComponent = dom(Preview, {canvasWidth: 100, canvasHeight: 100, shape: nextShape})
  const StatusComponent = dom(Status, {playerLevel: board.level, player, events})

  return dom('div', {class: 'Player'}, [
    dom('div', {class: 'Player-canvasColumn'}, [
      dom('div', {class: 'Box Player-canvasBox'}, [
        dom('div', {class: 'Player-playerName Box-head'}, [
          dom('span', {class: 'Box-title'}, [
            player.name
          ])
        ]),
        dom('div', {class: 'Box-content--no-padding'}, [
          dom('div', {class: 'Player-canvas'}, [
            dom(Canvas, {
              canvasWidth,
              canvasHeight,
              isActive,
              isFirstPlayer,
              board
            })
          ])
        ])
      ])
    ]),
    dom('div', {class: 'Player-statusColumn'}, [
      dom('div', {class: 'Player-statusColumnTop'}, [
        dom('div', {class: 'Box Player-preview'}, PreviewComponent),
        dom('div', {class: 'Player-status'}, StatusComponent)
      ]),
      dom('div', {class: 'Player-statusColumnBottom'}, [
        dom(Controls, {events})
      ])
    ])
  ])
}

export default Player
