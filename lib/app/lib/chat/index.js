import dom from 'virtual-element'

export const name = 'Chat'

/**
 * Return the scroll position to the bottom of the div
 * after each rerender
 * @param  {Object} component
 * @param  {Element} el
 */
export function afterRender (component, el) {
  let div = el.querySelector('.Chat-messages')
  div.scrollTop = div.scrollHeight
}

/**
 * Render the Chat view
 * @param  {Object} component
 * @return {VirtualNode}
 */
export function render (component) {
  let chatLog = component.props.chatLog
  let onSubmit = component.props.onSubmit
  let chatLogEls = null
  let chatLogList = dom('ul')

  /**
   * Take the input and give data to a callback
   * @param  {Event} event
   */
  function handle (event) {
    event.preventDefault()
    let form = event.target
    let inputEl = form.querySelector('.Chat-input')
    if (inputEl.value === '') return
    if (onSubmit) onSubmit(inputEl.value, form)
    inputEl.value = ''
  }

  // So we don't interfere with key-based eventListeners
  function catchInput (event) {
    event.cancelBubble = true
    return false
  }

  // Build chat message list
  if (chatLog && chatLog.length) {
    chatLogEls = chatLog.map(function (log) {
      return dom('li', {class: 'Chat-logItem'}, [
        dom('span', {class: 'Chat-logNick'}, [log.nick, ' > ']),
        dom('span', {class: 'Chat-logText'}, log.text)
      ])
    })
    chatLogList = dom('ul', {}, chatLogEls)
  }

  return dom('div', {class: 'Chat'}, [
    dom('div', {class: 'Box Chat-messages'}, [
      chatLogList
    ]),
    dom('div', {class: 'Chat-formContainer'}, [
      dom('form', {class: 'Chat-form', onSubmit: handle}, [
        dom('input', {
          class: 'Chat-input',
          onKeyDown: catchInput,
          name: 'chatInput',
          autoComplete: 'off',
          placeholder: 'Send a message...'
        })
      ])
    ])
  ])
}

export default {name, afterRender, render}
