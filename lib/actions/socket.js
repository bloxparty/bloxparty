export function connectToServer () {
  return {
    type: 'connectToServer'
  }
}

export function updateServerUri (serverUri) {
  return {
    type: 'updateServerUri',
    serverUri
  }
}

export function isConnecting () {
  return {
    type: 'isConnecting'
  }
}

export function connected (boolean) {
  return {
    type: 'connected',
    value: boolean
  }
}
