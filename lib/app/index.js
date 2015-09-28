import dom from 'virtual-element'
import bus from 'bus'
import Connect from './lib/connect'
import Home from './lib/home'
import Sidebar from './lib/sidebar'
import Game from './lib/game'

let propTypes = {
  config: {source: 'config'},
  connected: {source: 'connected'},
  visitHome: {source: 'visitHome'},
  visitGame: {source: 'visitGame'},
  visitConnect: {source: 'visitConnect'},
  route: {source: 'currentRoute'},
  client: {source: 'client'},
  stats: {source: 'stats'},
  board: {source: 'board'},
  err: {source: 'err'}
}

function render ({props}) {
  let view = 'div'
  let sidebarProps = {groups: []}

  if (props.route && props.route.name === 'connect') {
    view = Connect
  }

  if (props.route && props.route.name === 'home') {
    view = Home
    sidebarProps = Home.sidebar(props)
  }

  if (props.route && props.route.name === 'game') {
    view = Game
    sidebarProps = Game.sidebar(props)
  }

  return dom('div', {class: 'App'}, [
    dom(Sidebar, sidebarProps),
    dom('div', {class: 'App-content'}, [
      dom(view, props)
    ])
  ])
}

export default {propTypes, render}
