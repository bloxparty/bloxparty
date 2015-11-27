export const initialState = {
  name: '',
  game: {},
  board: {}
}

export default function player (state = initialState, action) {
  switch (action.type) {
    case 'updatePlayerName':
      return Object.assign({}, state, {
        name: action.playerName
      })
    default:
      return state
  }
}
