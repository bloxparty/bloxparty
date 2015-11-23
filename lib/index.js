import dom from 'virtual-element'
import {render, tree} from 'deku'
import {createStore} from 'redux'
import {storePlugin, connect} from 'deku-redux'
import reducers from './reducers'
import settings from './settings'
import socket from './socket'
import routes from './routes'
import actions from './actions'
import board from './board'
import App from './app'

const store = createStore(reducers, {
  connected: false,
  connecting: false
})

store.subscribe(() => console.log(store.getState()))

const app = tree(dom(App))

app.set('connected', false)
app.set('chatLog', [])
app.set('client', {})
app.set('stats', {
  games: [],
  players: []
})

app.use(storePlugin(store))
app.use(settings)
app.use(board)
app.use(socket(app, store))
app.use(routes)
app.use(actions)

render(app, document.body)
