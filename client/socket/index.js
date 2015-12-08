import events from '../../server/events'

export default function socketPlugin (app, listener, socket) {
  return function () {
    listener.on(events.client.signIn, function (name) {
      socket.emit(events.client.signIn, name)
    })

    listener.on(events.client.joinGame, function (id) {
      socket.emit(events.client.joinGame, id)
    })

    listener.on(events.client.quitGame, function () {
      socket.emit(events.client.quitGame)
    })

    listener.on(events.client.requestStartGame, function () {
      socket.emit(events.client.requestStartGame)
    })

    listener.on(events.client.sendChat, function (msg) {
      socket.emit(events.client.sendChat, msg)
    })

    listener.on(events.client.sendBoard, function (board) {
      socket.emit(events.client.sendBoard, board)
    })

    listener.on(events.client.clearLine, function (count) {
      socket.emit(events.client.clearLine, count)
    })

    listener.on(events.board.lose, function () {
      socket.emit(events.board.lose)
    })

    socket.on(events.server.playerUpdate, function (player) {
      app.set('player', player)
    })

    socket.on(events.board.queue, function (queue) {
      listener.emit(events.board.queue, queue)
    })

    socket.on(events.server.lobbyUpdate, function (lobby) {
      app.set('lobby', lobby)
    })

    socket.on(events.server.startGame, function () {
      listener.emit(events.server.startGame)
    })

    socket.on(events.server.addLines, (count) => {
      listener.emit(events.server.addLines, count)
    })
  }
}
