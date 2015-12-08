import debug from 'debug'
import http from 'http'
import path from 'path'
import array from 'array'
import Express from 'express'
import compression from 'compression'
import browserify from 'browserify-middleware'
import sio from 'socket.io'
import postcss from 'postcss-middleware'
import postcssImport from 'postcss-import'
import postcssNext from 'postcss-cssnext'
import events from './events'
import renderMiddleware from './render'
import Player from './player'
import db from './db'

const development = process.env.ENV === 'development'
const port = process.env.PORT || 8080

const app = Express()
const server = http.Server(app)
const io = sio.listen(server)

const Games = db().games
const Players = db().players
const chatLog = array()

let interval = null

configureMiddleware()

app.use(compression())
app.use(Express.static(path.join(__dirname, '..', 'static')))

/**
 * Init server
 * @return {undefined}
 */
server.listen(port, (err) => {
  if (err) debug(err)

  io.on('connection', (socket) => {
    socket.on(events.client.signIn, (name) => {
      if (Players.find(player => player.name === name)) {
        socket.emit(events.server.signInError, 'That name is taken.')
        return
      }

      const player = Player({name, socket})
      socket.emit(events.server.playerUpdate, player.json())

      player.on('change', () => {
        socket.emit(events.server.playerUpdate, player.json())
      })

      player.on(events.client.sendlobbyMsg, msg => {
        if (msg) chatLog.push(msg)
      })
    })
  })
  if (interval) clearInterval(interval)
  interval = setInterval(() => { io.emit(events.server.lobbyUpdate, lobbyState()) }, 500)
  console.info('----\n==> Blox Party is running on port %s', port)
})

/**
 * Get lobby state
 * @return {JSON}
 */
function lobbyState () {
  const players = Players.map((player) => { return player.json() })
  const games = Games.map((game) => { return game.json() })
  const log = chatLog.toJSON()
  return {
    players: players.toJSON(),
    games: games.toJSON(),
    chatLog: log
  }
}

/**
 * Configure request handlers
 * @return {undefined}
 */
function configureMiddleware () {
  const browserifySettings = {}
  const postCssSettings = {}
  let cssMiddleware
  let jsMiddleware

  postCssSettings.src = function (req) {
    return __dirname + '/../client/index.css'
  }

  postCssSettings.plugins = [
    postcssImport,
    postcssNext
  ]

  browserifySettings.cache = development
  browserifySettings.transform = [(file) => {
    return require('babelify')(file, {
      ignore: 'socket.io'
    })
  }]

  if (!development) {
    browserifySettings.transform.push((file) => {
      return require('uglifyify')(file)
    })
  }

  browserify.settings(browserifySettings)
  jsMiddleware = browserify(__dirname + '/../client/index.js')
  cssMiddleware = postcss(postCssSettings)

  app.use('/js', jsMiddleware)
  app.use('/css', cssMiddleware)
  app.use('/', renderMiddleware)
}
