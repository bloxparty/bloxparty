import dom from 'virtual-element'
import qs from 'query-string'
import io from 'socket.io-client'
import {Form, InputField} from 'deku-form'
import {connect} from 'deku-redux'
import actions from '/lib/actions/connect'

const name = 'Connect'

export function initialState () {
  return {
    connected: false
  }
}

function initSocket (serverUri, playerName) {
  const socket = io(serverUri, {
    'forceNew': true,
    query: 'nick=' + playerName
  })
  return socket
}

/**
 * Connect Form Component
 */
export function render (component) {
  let {settings, visitHome, err} = component.props
  let {nick, serverURI} = settings
  let connected = component.state.connected
  let errView

  if (err) errView = dom('div', {class: 'Connect-error'}, [err])

  if (connected) visitHome()

  function save (data) {
    data = qs.parse(data)
    setState('nick', data.nick)
    setState('serverUri', data.serverUri)
    initSocket(state)
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

function mapStateToProps (state) {
  return {
    connected: state.get('connected'),
    connecting: state.get('connecting'),
    disconnecting: state.get('disconnecting')
  }
}

export default dom(connect(
  mapStateToProps,
  actions
)({render, name, initialState}))
