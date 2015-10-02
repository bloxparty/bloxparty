import Emitter from 'component-emitter'
import clone from 'component-clone'

let localStorage = null

if (typeof window !== 'undefined') localStorage = window.localStorage

/**
 * Init LocalStorage with `name` and `defaults`
 * @param {String} name     Name for this store
 * @param {Object} defaults Default key/value object
 * @api public
 */
export default function LocalStorage (name, defaults) {
  if (!name) throw new Error('name required')
  if (!(this instanceof LocalStorage)) return new LocalStorage(name, defaults)
  this.defaults = defaults || {}
  this.name = name
  this.data = this.load()
  this.store()
}

/**
 * Mixins
 */
Emitter(LocalStorage.prototype)

/**
 * Load initial values into memory
 * @return {Object} Data
 * @api public
 */
LocalStorage.prototype.load = function load () {
  let data = localStorage ? localStorage.getItem(this.name) : null
  if (!data) return this.defaults
  return JSON.parse(data)
}

/**
 * Save data set to localStorage
 * @api private
 */
LocalStorage.prototype.store = function store () {
  if (localStorage) localStorage.setItem(this.name, JSON.stringify(this.data))
  this.emit('change')
}

/**
 * Get value of `key` or get all key/values
 * @param  {String} key Optional.  Retrieve data at `key`
 * @return {Mixed}
 * @api public
 */
LocalStorage.prototype.get = function get (key) {
  if (key) return key in this.data ? this.data[key] : null
  else return clone(this.data)
}

/**
 * Set value of `key` to `value`
 * @param {String} key
 * @param {Mixed} value
 * @api public
 */
LocalStorage.prototype.set = function set (key, value) {
  this.data[key] = value
  this.store()
  this.emit('key', value)
}
