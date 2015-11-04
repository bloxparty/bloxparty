import dom from 'virtual-element'
import moment from 'moment'
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
      let logDate = moment(log.date).format('HH:mm:ss')
      return dom('li', {class: 'HomeChatWindow-logItem'}, [
        dom('span', {class: 'HomeChatWindow-logDate'}, '[' + logDate + ']'),
        dom('span', {class: 'HomeChatWindow-logNick'}, [log.nick, ' > ']),
        dom('span', {class: 'HomeChatWindow-logText'}, log.text)
      ])
    })
  }

  return dom('div', {class: 'HomeChatWindow'}, [
    // dom('div', {class: 'Box-head--large'}, [
    //   dom('span', {class: 'Box-title'}, 'Chat')
    // ]),
    dom('div', {class: 'HomeChatWindow-chatWindow'}, [
      dom('ul', [chatLogEls])
    ])
  ])
}

function afterRender (component, el) {
  let boxContentEl = el.querySelector('.HomeChatWindow-chatWindow')
  boxContentEl.scrollTop = boxContentEl.scrollHeight
}

function shouldUpdate (component, nextProps) {
  let results = diff(component.props.chatLog, nextProps.chatLog)
  if (results && results.length) return true
  return false
}

export default {render, afterRender, shouldUpdate, name}