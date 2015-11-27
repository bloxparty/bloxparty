export const initialState = {
  name: ''
}

export default function route (state = initialState, action) {
  switch (action.type) {
    case 'changeRoute':
      return Object.assign({}, state, {
        name: action.name
      })
    default:
      return state
  }
}
