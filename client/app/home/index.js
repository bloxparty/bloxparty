import bus from 'bus'
import dom from 'virtual-element'
import GameList from './game-list'
import PlayerList from './player-list'
import Chat from '../chat'

export const Home = {name: 'Home'}

Home.propTypes = {
  lobby: { source: 'lobby' },
  events: { source: 'events' }
}

/**
 * Render the Home view
 * @param  {Object} component Component object
 * @return {Object}
 */
Home.render = function render ({props}) {
  const {lobby, events} = props
  const {games, players, chatLog} = lobby

  function handleChat (msg) {
    bus.emit(events.client.sendChat, msg)
  }

  return dom('div', {class: 'Home'}, [
    dom('div', {class: 'Home-topBlock'}, [
      dom('div', {class: 'Home-gamesContainer'}, [
        dom(GameList, {games, events})
      ]),
      dom('div', {class: 'Home-playersContainer'}, [
        dom(PlayerList, {players})
      ])
    ]),
    dom(Chat, {chatLog, onSubmit: handleChat})
  ])
}

export default Home
