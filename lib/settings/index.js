import bus from 'bus'
import LS from './data'

export default function plugin (app) {
  const localStorage = LS('settings', {
    serverURI: '',
    nick: ''
  })

  localStorage.on('change', () => app.set('settings', localStorage.get()))

  bus.on('settings:set', (key, value) => localStorage.set(key, value))

  app.set('settings', localStorage.data)
}
