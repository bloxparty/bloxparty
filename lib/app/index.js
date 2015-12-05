import dom from 'virtual-element'
import Connect from './lib/connect'
import Home from './lib/home'
import Game from './lib/game'

const name = 'App'

let propTypes = {
  err: {source: 'err'},
  chatLog: {source: 'chatLog'},
  settings: {source: 'settings'},
  connected: {source: 'connected'},
  client: {source: 'client'},
  stats: {source: 'stats'},
  board: {source: 'board'},
  route: {source: 'currentRoute'},
  visitHome: {source: 'visitHome'},
  visitGame: {source: 'visitGame'},
  visitConnect: {source: 'visitConnect'}
}

/**
 * Main App Component
 * @param  {Object} component Component object
 * @return {Object} Deku component
 */
function render (component) {
  let {route, connected} = component.props
  let view = 'div'

  if (!connected) { route = {name: 'connect'} }

  if (route && route.name === 'connect') view = Connect
  if (route && route.name === 'home') view = Home
  if (route && route.name === 'game') view = Game

  return dom('div', {class: 'App'}, [
    dom('div', {class: 'App-content'}, [
      dom(view, component.props)
    ])
  ])
}

export default {propTypes, render, name}
