import io from 'socket.io-client'
import actions from '../actions'

const socketActions = actions.socket
const routeActions = actions.route

export default store => next => action => {
  let state = store.getState()
  let result = next(action)
  console.log(state)
  const serverUri = state.socket.serverUri
  const playerName = state.socket.name

  if (action.type !== 'connectToServer') return result

  const socket = io(serverUri, {
    'forceNew': true,
    query: 'nick=' + playerName
  })

  store.dispatch(socketActions.isConnecting())

  socket.on('connect', () => {
    store.dispatch(socketActions.connected(true))
    store.dispatch(routeActions.changeRoute('home'))
  })

  socket.on('disconnect', () => {
    store.dispatch(socketActions.connected(false))
    store.dispatch(routeActions.changeRoute('connect'))
  })

  return result
}
