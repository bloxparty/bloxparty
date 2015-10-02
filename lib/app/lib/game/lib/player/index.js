import bus from 'bus'
import dom from 'virtual-element'
import Canvas from './lib/canvas'
import Preview from './lib/preview'
import Status from './lib/status'

const name = 'PlayerCanvas'

function render (component) {
  let player = component.props.client
  let board = player.board
  let playerLevel = board.level
  let preview = dom(Preview, component.props)
  let status = dom(Status, component.props)

  return dom('div', {class: 'GamePlayer'}, [
    dom('div', {class: 'GamePlayer-name'}, player.nick),
    dom('div', {class: 'GamePlayer-canvas'}, [
      dom(Canvas, {
        width: 250,
        height: 500,
        board: board
      })
    ]),
    dom('div', {class: 'GamePlayer-statusColumn'}, [
      dom('div', {class: 'GamePlayer-preview'}, preview),
      dom('div', {class: 'GamePlayer-status'}, status)
    ])
  ])
}

export default {render, name}
