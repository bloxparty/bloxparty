import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'
import socketMiddleware from '../middleware/socket'

const loggerMiddleware = createLogger()

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware,
  socketMiddleware
)(createStore)

export default function configureStore (initialState) {
  return createStoreWithMiddleware(rootReducer, initialState)
}
