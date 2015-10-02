import dom from 'virtual-element'
import Connect from './lib/connect'
import Home from './lib/home'
import Sidebar from './lib/sidebar'
import Game from './lib/game'

let propTypes = {
  err: {source: 'err'},
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
  let {route} = component.props
  let view = 'div'

  if (route && route.name === 'connect') view = Connect
  if (route && route.name === 'home') view = Home
  if (route && route.name === 'game') view = Game

  let sidebarProps = view.sidebar ? view.sidebar(component.props) : null

  return dom('div', {class: 'App'}, [
    dom(Sidebar, sidebarProps),
    dom('div', {class: 'App-content'}, [
      dom(view, component.props)
    ])
  ])
}

export default {propTypes, render}
