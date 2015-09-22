import bus from 'bus'
import Config from './data'

export default function plugin () {
  return function (app) {
    var config = new Config()
    app.set('config', config.data)
    config.on('change', () => app.set('config', config.get()))
    bus.on('config:set', (key, value) => config.set(key, value))
  }
}
