import dom from 'virtual-element'
import bus from 'bus'
import Games from './lib/games'
import Players from './lib/players'
import * as Chat from '../chat'

const name = 'Home'
console.log(Chat)

/**
 * Render the Home view
 * @param  {Object} component Component object
 * @return {Object}
 */
function render (component) {
  let {stats, client, chatLog, connected, visitGame, visitConnect} = component.props

  if (!connected) visitConnect()
  if (client && client.game) visitGame()

  return dom('div', {class: 'Home'}, [
    dom('div', {class: 'Home-topBlock'}, [
      dom('div', {class: 'Home-gamesContainer'}, [
        dom(Games, {games: stats.games})
      ]),
      dom('div', {class: 'Home-playersContainer'}, [
        dom('div', {class: 'Box'}, [
          dom('div', {class: 'Box-head--large'}, [
            dom('span', {class: 'Box-title'}, 'Players')
          ]),
          dom('div', {class: 'Box-content'}, [
            dom(Players, {players: stats.players})
          ])
        ])
      ])
    ]),
    dom(Chat, {
      chatLog: chatLog,
      onSubmit: function onSubmit (text) {
        bus.emit('player:chat', text)
      }
    })
  ])
}

export default {name, render}
