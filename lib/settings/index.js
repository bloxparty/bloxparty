import bus from 'bus'
import Store from 'localstorage-ns'

export default function plugin (app) {
  const localStorage = Store('settings', {
    serverURI: '',
    nick: ''
  })

  localStorage.on('change', () => app.set('settings', localStorage.get()))

  bus.on('settings:set', (key, value) => localStorage.set(key, value))

  app.set('settings', localStorage.data)
}
