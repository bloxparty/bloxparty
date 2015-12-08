import bus from 'bus'
import dom from 'virtual-element'
import {render, tree} from 'deku'
import io from 'socket.io-client'
import socketPlugin from './socket'
import boardPlugin from './board'
import events from '../server/events'
import App from './app'

const socket = io()
const app = tree(dom(App))

app.use(socketPlugin(app, bus, socket))
app.use(boardPlugin)

app.set('events', events)
app.set('player', {})
app.set('lobby', {
  players: [],
  games: [],
  chatLog: []
})

render(app, document.querySelector('main'))
