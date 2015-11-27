import dom from 'virtual-element'
import {connect} from 'deku-redux'
import {bindActionCreators} from 'redux'
import SignIn from './lib/signin'
import Home from './lib/home'
import actions from '../../../actions'

const components = {
  SignIn,
  Home
}

export const Main = {name: 'Main'}

/**
 * Main component
 * @param  {Object} component Component object
 * @return {Object} Deku component
 */
Main.render = function render ({props}) {
  const {route} = props
  let segment = route ? route.name.split('.')[0] : undefined

  if (segment) {
    segment = segment.charAt(0).toUpperCase() + segment.slice(1)
  }
  return dom(components[segment] || SignIn, props)
}

function mapStateToProps (state) {
  return state
}

function mapDispatch (dispatch) {
  return {
    playerActions: bindActionCreators(actions.player, dispatch),
    socketActions: bindActionCreators(actions.socket, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatch)(Main)
