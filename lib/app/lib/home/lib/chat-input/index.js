import dom from 'virtual-element'
import bus from 'bus'

const name = 'HomeChatInput'

/**
 * Render the Chat view
 * @param  {Object} component
 * @return {Object}
 */
function render (component) {
  function sendChat (event) {
    event.preventDefault()
    let inputEl = event.target.querySelector('.HomeChatInput-input')
    bus.emit('player:chat', inputEl.value)
    inputEl.value = ''
  }

  return dom('div', {class: 'HomeChatInput'}, [
    dom('form', {class: 'HomeChatInput-form', onSubmit: sendChat}, [
      dom('div', {class: 'HomeChatInput-inputContainer'}, [
        dom('input', {class: 'HomeChatInput-input', name: 'chatInput', autoComplete: 'off', placeholder: 'Send a message...'})
      ])
    ])
  ])
}

export default {render, name}
