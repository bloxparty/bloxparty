import {combineReducers} from 'redux'
import player from './player'
import route from './route'
import socket from './socket'

const rootReducer = combineReducers({
  route,
  player,
  socket
})

export default rootReducer
