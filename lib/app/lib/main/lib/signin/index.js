'use strict'
import dom from 'virtual-element'
import {Form, InputField} from 'deku-form'
import qs from 'query-string'
import Box from '../../../box'

/**
 * SignIn Form Component
 */

const SignIn = {name: 'SignIn'}

SignIn.render = function render ({props}) {
  const {player, socket, playerActions, socketActions} = props

  function handleSubmit (data) {
    data = qs.parse(data)
    playerActions.updatePlayerName(data.name)
    socketActions.updateServerUri(data.serverUri)
    socketActions.connectToServer()
  }

  return dom('div', {class: 'SignIn'}, [
    dom('div', {class: 'SignIn-boxContainer'}, [
      dom(Box, {title: 'Sign In'}, [
        dom(Form, {class: 'SignIn-form', onSubmit: handleSubmit}, [
          dom(InputField, {
            class: 'SignIn-playerNameInput',
            name: 'name',
            type: 'text',
            placeholder: 'Player Name',
            value: player ? player.name : '',
            required: true
          }),
          dom(InputField, {
            class: 'SignIn-serverUriInput',
            name: 'serverUri',
            type: 'text',
            placeholder: 'Server URI',
            value: socket ? socket.serverUri : '',
            required: true
          }),
          dom('button', {
            class: 'Button SignIn-button',
            type: 'submit'
          }, ['OK'])
        ])
      ])
    ])
  ])
}

export default SignIn
