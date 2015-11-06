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
  let errView = null

  if (err) errView = dom('div', {class: 'Connect-error'}, [err])

  if (connected) visitHome()

  function save (data) {
    data = qs.parse(data)
    bus.emit('settings:set', 'nick', data.nick)
    bus.emit('settings:set', 'serverURI', data.serverURI)
    bus.emit('network:connect', data.serverURI, data.nick)
  }

  return dom('div', {class: 'Connect'}, [
    dom('div', {class: 'Connect-boxContainer'}, [
      dom('div', {class: 'Box'}, [
        dom('div', {class: 'Box-head'}, [
          dom('h2', {class: 'Box-title'}, 'Connect to a server')
        ]),
        dom('div', {class: 'Box-content'}, [
          errView,
          dom(Form, {onSubmit: save, class: 'Connect-form'}, [
            dom(InputField, {
              name: 'nick',
              type: 'text',
              placeholder: 'Player Name',
              value: nick,
              required: true
            }),
            dom(InputField, {
              name: 'serverURI',
              type: 'text',
              placeholder: 'Server URI',
              value: serverURI,
              required: true
            }),
            dom('button', {
              class: 'Button Connect-button',
              type: 'submit'
            }, ['OK'])
          ])
        ])
      ])
    ])
  ])
}

export default {render, name}
