export const initialState = {
  serverUri: '',
  connected: false,
  isConnecting: false,
  disconnecting: false
}

export default function socket (state = initialState, action) {
  switch (action.type) {
    case 'updateServerUri':
      return Object.assign({}, state, {
        serverUri: action.serverUri
      })
    case 'isConnecting':
      return Object.assign({}, state, {
        isConnecting: true
      })
    case 'connected':
      return Object.assign({}, state, {
        isConnecting: false,
        connected: action.value
      })
    default:
      return state
  }
}
