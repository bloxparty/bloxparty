import bus from 'component/bus'
import element from 'dekujs/virtual-element'

const ENTER = 13

function render (component, setState) {
  let {config, connected, visitHome, err} = component.props
  let {nick, serverURI} = config

  if (connected) visitHome()

  function onKeyUp (event) {
    if (event.keyCode === ENTER) return save()
    var obj = {}
    obj[event.target.name] = event.target.value
    setState(obj)
  }

  function save () {
    bus.emit('config:set', 'nick', component.state.nick)
    bus.emit('config:set', 'serverURI', component.state.serverURI)
    bus.emit('network:connect', component.state.serverURI, component.state.nick)
  }

  return element('div', {class: 'Connect'}, [
    element('h2', {class: 'Connect-title'}, ['Connect to a server']),
    element('div', {class: 'Connect-error'}, [err]),
    element('div', [
      element('label', {class: 'Connect-label'}, ['Player Name: ']),
      element('input', {onKeyUp: onKeyUp, class: 'Connect-input', type: 'text', name: 'nick', value: nick})
    ]),
    element('div', [
      element('label', {class: 'Connect-label'}, ['Server URI: ']),
      element('input', {onKeyUp: onKeyUp, class: 'Connect-input', type: 'text', name: 'serverURI', value: serverURI})
    ]),
    element('button', {onClick: save, class: 'Button Connect-button'}, ['Connect'])
  ])
}

function afterMount (component, el, setState) {
  let {config} = component.props
  setState(config)
}

export default {render, afterMount}
