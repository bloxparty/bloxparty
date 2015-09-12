import bus from 'component/bus'
import element from 'dekujs/virtual-element'

const ENTER = 13

let propTypes = {
  chatTranscript: {source: 'chatTranscript'}
}

function render (component, setState) {
  let {props} = component

  let items = props.chatTranscript.map(function (item) {
    return element('li', [
      element('span', {class: 'Chat-name'}, [item.name]),
      element('span', {class: 'Chat-message'}, [item.message])
    ])
  })

  function onKeyUp (event) {
    if (event.keyCode !== ENTER) return
    bus.emit('chat:send', event.target.value)
  }

  return element('div', {class: 'Chat'}, [
    element('div', {class: 'Chat-transcript'}, [items]),
    element('div', {onKeyUp: onKeyUp, class: 'Chat-input'})
  ])
}

export default {render, propTypes}
