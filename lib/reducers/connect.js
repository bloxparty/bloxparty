import Socket from '../socket'
let socket = null

const initialState = {
  connected: false,
  connecting: false,
  disconnecting: false
}

export function destroySocket () {
  socket.destroy()
}

export default function connect (state = initialState, action) {
  switch (action.type) {
    case 'connect':
      Socket(action.serverUri, action.playerName)
      state.connecting = true
      return state
    case 'connected':
      state.connected = true
      state.connecting = false
      return state
    case 'disconnect':
      destroySocket()
      state.disconnecting = true
      return state
    case 'disconnected':
      state.connected = false
      state.disconnecting = false
  }
  return state
}
