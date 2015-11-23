export function connect (serverUri, playerName) {
  return {
    type: 'connect',
    serverUri,
    playerName
  }
}

export function connected () {
  console.log('connected')
  return {
    type: 'connected'
  }
}

export function disconnect () {
  return {
    type: 'disconnect'
  }
}

export function disconnected () {
  return {
    type: disconnected
  }
}
