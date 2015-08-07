import Emitter from 'component/emitter'
import clone from 'component/clone'

if (typeof window !== 'undefined') var localStorage = window.localStorage

const KEY = 'settings'
const DEFAULTS = {
  serverURI: '',
  nick: ''
}

export default class Config extends Emitter {
  constructor () {
    super()
    this.data = this.load()
    this.store
  }

  load () {
    var data = localStorage ? localStorage.getItem(KEY) : null
    if (!data) return DEFAULTS
    return JSON.parse(data)
  }

  store () {
    this.emit('change')
    if (localStorage) localStorage.setItem(KEY, JSON.stringify(this.data))
  }

  get () {
    return clone(this.data)
  }

  set (key, value) {
    this.data[key] = value
    this.store()
  }
}
