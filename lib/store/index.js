import {createStore} from 'redux'
import rootReducer from '../reducers'
let store

export default function getStore (initialState) {
  console.log(rootReducer)
  if (!store) store = createStore(rootReducer, initialState)
  return store
}
