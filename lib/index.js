import dom from 'virtual-element'
import {render, tree} from 'deku'
import settings from './settings'
import socket from './socket'
import routes from './routes'
import actions from './actions'
import board from './board'
import App from './app'

let app = tree(dom(App))

app.set('connected', false)
app.set('client', {})
app.set('stats', {
  games: [],
  players: []
})

app.use(settings)
app.use(board)
app.use(socket)
app.use(routes)
app.use(actions)

render(app, document.getElementById('app'))