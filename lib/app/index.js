import element from 'dekujs/virtual-element'
import Connect from '/lib/connect'
import Home from '/lib/home'
// import Topbar from '/lib/topbar'
import Game from '/lib/game'

var propTypes = {
  config: {source: 'config'},
  connected: {source: 'connected'},
  visitHome: {source: 'visitHome'},
  visitGame: {source: 'visitGame'},
  route: {source: 'currentRoute'},
  player: {source: 'player'},
  client: {source: 'client'},
  stats: {source: 'stats'},
  err: {source: 'err'}
}

function render ({props}) {
  let view = 'div'
  if (props.route && props.route.name === 'connect') {
    view = Connect
  }

  if (props.route && props.route.name === 'home') {
    view = Home
    props = {
      game: props.game,
      games: props.games,
      players: props.players,
      client: props.client,
      visitGame: props.visitGame,
      stats: props.stats
    }
  }

  if (props.route && props.route.name === 'game') {
    view = Game
    props = {
      game: props.game,
      config: props.config,
      player: props.player,
      client: props.client,
      visitHome: props.visitHome
    }
  }

  return element('div', {class: 'App'}, [
    // element(Topbar),
    element(view, props)
  ])
}

export default {propTypes, render}
