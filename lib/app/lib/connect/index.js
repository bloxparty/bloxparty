import bus from 'component/bus'
import element from 'dekujs/virtual-element'
import {Form, InputField} from 'dominicbarnes/deku-forms'

function render (component, setState) {
  let {config, connected, visitHome, err} = component.props
  let {nick, serverURI} = config

  if (connected) visitHome()

  function save (data) {
    bus.emit('config:set', 'nick', data.nick)
    bus.emit('config:set', 'serverURI', data.serverURI)
    bus.emit('network:connect', data.serverURI, data.nick)
  }

  return element('div', {class: 'Connect'}, [
    element(Form, {onSubmit: save, class: 'Connect-form'}, [
      element('h2', {class: 'Connect-title'}, ['Connect to a server']),
      element('div', {class: 'Connect-error'}, [err]),
      element(InputField, {
        name: 'nick',
        label: 'Player Name',
        type: 'text',
        value: nick,
        required: true
      }),
      element(InputField, {
        name: 'serverURI',
        label: 'Server URI',
        type: 'text',
        value: serverURI,
        required: true
      }),
      element('button', {
        class: 'Button Connect-button',
        type: 'submit'
      }, ['Connect'])
    ])
  ])
}

export default {render}
