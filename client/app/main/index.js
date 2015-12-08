import dom from 'virtual-element'
import SignIn from '../signin'
import Home from '../home'
import Game from '../game'

const components = {
  SignIn,
  Home,
  Game
}

export const Main = {name: 'Main'}

Main.propTypes = {
  player: { source: 'player' },
  route: { source: 'route' }
}

/**
 * Main component
 * @param  {Object} component Component object
 * @return {Object} Deku component
 */
Main.render = function render ({props}) {
  const {player, route} = props
  const {game} = player

  let segment = route && route.name ? route.name.split('.')[0] : undefined
  if (segment) {
    segment = segment.charAt(0).toUpperCase() + segment.slice(1)
  }
  if (!segment && player.name) segment = 'Home'
  if (game && game.id) segment = 'Game'
  return dom(segment ? components[segment] : SignIn)
}

export default Main
