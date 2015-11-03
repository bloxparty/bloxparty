import dom from 'virtual-element'
import bus from 'bus'
import {diff} from 'deep-diff'

const name = 'GameChat'

/**
 * Render the Chat view
 * @param  {Object} component
 * @return {Object}
 */
function render (component) {
  let chatLog = component.props.chatLog
  let chatLogEls = null

  function sendChat (event) {
    event.preventDefault()
    let inputEl = event.target.querySelector('.GameChat-input')
    bus.emit('player:chat', inputEl.value)
    inputEl.value = ''
  }

  function catchInput (event) {
    event.cancelBubble = true
    return false
  }

  if (chatLog.length) {
    chatLogEls = chatLog.map(function (log) {
      return dom('li', {class: 'GameChat-logItem'}, [
        dom('span', {class: 'GameChat-logNick'}, [log.nick, ' > ']),
        dom('span', {class: 'GameChat-logText'}, log.text)
      ])
    })
  }

  return dom('div', {class: 'GameChat'}, [
    dom('div', {class: 'GameChat-chatWindow'}, chatLogEls),
    dom('div', {class: 'GameChat-formContainer'}, [
      dom('form', {class: 'GameChat-form', onSubmit: sendChat}, [
        dom('div', {class: 'GameChat-inputContainer'}, [
          dom('input', {class: 'GameChat-input', onKeyDown: catchInput, name: 'chatInput', autoComplete: 'off', placeholder: '>'})
        ])
      ])
    ])
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
