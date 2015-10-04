import bus from 'bus'
import dom from 'virtual-element'
import qs from 'query-string'
import {Form, InputField} from 'deku-form'

const name = 'Connect'

/**
 * Connect Form Component
 */
function render (component, setState) {
  let {settings, connected, visitHome, err} = component.props
  let {nick, serverURI} = settings

  if (connected) visitHome()

  function save (data) {
    data = qs.parse(data)
    bus.emit('settings:set', 'nick', data.nick)
    bus.emit('settings:set', 'serverURI', data.serverURI)
    bus.emit('network:connect', data.serverURI, data.nick)
  }

  return dom('div', {class: 'Connect'}, [
    dom(Form, {onSubmit: save, class: 'Connect-form'}, [
      dom('h2', {class: 'Connect-title'}, ['Connect to a server']),
      dom('div', {class: 'Connect-error'}, [err]),
      dom(InputField, {
        name: 'nick',
        label: 'Player Name',
        type: 'text',
        value: nick,
        required: true
      }),
      dom(InputField, {
        name: 'serverURI',
        label: 'Server URI',
        type: 'text',
        value: serverURI,
        required: true
      }),
      dom('div', {class: 'FormField-controls'}, [
        dom('div', {class: 'FormField-label'}),
        dom('button', {
          class: 'Button Connect-button',
          type: 'submit'
        }, ['Connect'])
      ])
    ])
  ])
}

export default {render, name}
