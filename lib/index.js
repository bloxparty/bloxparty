import element from 'dekujs/virtual-element'
import {render, tree} from 'dekujs/deku'
import config from './config'
import network from './network'
import routes from './routes'
// import board from './board'
import actions from './actions'
import App from './app'

let app = tree(element(App))

app.set('connected', false)
app.set('players', [])
app.set('games', [])
app.set('client', {})
app.set('game', {})

app.use(config())
app.use(network())
// app.use(board())
app.use(routes)
app.use(actions)
render(app, document.getElementById('app'))