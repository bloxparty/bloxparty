import dom from 'virtual-element'
import {render, tree} from 'deku'
import settings from './settings'
import socket from './socket'
import routes from './routes'
import actions from './actions'
import board from './board'
import ipc from './ipc'
import App from './app'

let app = tree(dom(App))

app.set('electron', false)
app.set('connected', false)
app.set('chatLog', [])
app.set('client', {})
app.set('stats', {
  games: [],
  players: []
})

if (window && window.process && window.process.versions['electron']) {
  app.set('electron', true)
}

app.use(settings)
app.use(board)
app.use(socket)
app.use(routes)
app.use(actions)
app.use(ipc)

render(app, document.querySelector('#main'))
