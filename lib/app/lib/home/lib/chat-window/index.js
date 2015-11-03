import dom from 'virtual-element'
import bus from 'bus'
import {diff} from 'deep-diff'

const name = 'HomeChat'

/**
 * Render the Chat view
 * @param  {Object} component
 * @return {Object}
 */
function render (component) {
  let chatLog = component.props.chatLog
  let chatLogEls = null

  if (chatLog.length) {
    chatLogEls = chatLog.map(function (log) {
      return dom('li', {class: 'HomeChatWindow-logItem'}, [
        dom('span', {class: 'HomeChatWindow-logNick'}, [log.nick, ' > ']),
        dom('span', {class: 'HomeChatWindow-logText'}, log.text)
      ])
    })
  }

  return dom('div', {class: 'HomeChatWindow'}, [
    // dom('div', {class: 'HomeChatWindow-chatWindowContainer'}, [
      dom('div', {class: 'HomeChatWindow-chatWindow'}, [
        dom('ul', [chatLogEls])
      ])
    // ])
  ])
}

function afterRender (component, el) {
  el.children[0].scrollTop = el.children[0].scrollHeight
}

function shouldUpdate (component, nextProps) {
  let results = diff(component.props.chatLog, nextProps.chatLog)
  if (results && results.length) return true
  return false
}

export default {render, afterRender, shouldUpdate, name}
