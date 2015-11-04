import dom from 'virtual-element'
import Games from './lib/games'
import Players from './lib/players'
import ChatWindow from './lib/chat-window'
import ChatInput from './lib/chat-input'

const name = 'Home'

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
    dom(ChatWindow, {chatLog: chatLog}),
    dom(ChatInput)
  ])
}

export default {name, render}
