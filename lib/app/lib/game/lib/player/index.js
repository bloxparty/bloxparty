import dom from 'virtual-element'
import Canvas from './lib/canvas'
import Preview from './lib/preview'
import Status from './lib/status'
import Controls from './lib/controls'

const name = 'PlayerCanvas'

function render (component) {
  let player = component.props.client
  let board = component.props.board
  let preview = dom(Preview, component.props)
  let status = dom(Status, component.props)

  return dom('div', {class: 'GamePlayer'}, [
    dom('div', {class: 'GamePlayer-canvasColumn'}, [
      dom('div', {class: 'Box'}, [
        dom('div', {class: 'Box-head GamePlayer-name'}, player.nick),
        dom('div', {class: 'Box-content--no-padding'}, [
          dom('div', {class: 'GamePlayer-canvas'}, [
            dom(Canvas, {
              width: 252,
              height: 500,
              player: player,
              board: board
            })
          ])
        ])
      ])
    ]),
    dom('div', {class: 'GamePlayer-statusColumn'}, [
      dom('div', {class: 'GamePlayer-statusColumnTop'}, [
        dom('div', {class: 'GamePlayer-preview'}, preview),
        dom('div', {class: 'GamePlayer-status'}, status)
      ]),
      dom('div', {class: 'GamePlayer-statusColumnBottom'}, [
        dom(Controls)
      ])
    ])
  ])
}

export default {render, name}
