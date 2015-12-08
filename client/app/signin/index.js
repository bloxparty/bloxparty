import bus from 'bus'
import dom from 'virtual-element'
import {Form, InputField} from 'deku-form'
import Box from '../box'
import qs from 'query-string'

/**
 * SignIn Form Component
 */

export const SignIn = {name: 'SignIn'}

SignIn.propTypes = {
  events: { source: 'events' },
  player: {source: 'player'}
}

SignIn.render = function render ({props}) {
  const {events, player} = props

  function handleSubmit (data) {
    data = qs.parse(data)
    bus.emit(events.client.signIn, data.name)
  }

  return dom('div', {class: 'SignIn'}, [
    dom('h1', {class: 'SignIn-title'}, 'Blox Party'),
    dom('div', {class: 'SignIn-boxContainer'}, [
      dom(Box, {title: 'Sign In'}, [
        dom(Form, {class: 'SignIn-form', onSubmit: handleSubmit}, [
          dom(InputField, {
            class: 'SignIn-playerNameInput',
            name: 'name',
            type: 'text',
            placeholder: 'Player Name',
            value: player ? player.name : '',
            required: true,
            autocomplete: false
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
