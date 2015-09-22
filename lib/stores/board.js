import Pathwise from 'level-pathwise'
import level from 'level'

export default function plugin () {
  return function (app) {
    let store = Pathwise(level('bloxparty-board'))

    app.set('board', store.get())
    store.on('change', () => app.set('board', store.get()))

  }
}