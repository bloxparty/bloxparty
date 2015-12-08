import bus from 'bus'
import dom from 'virtual-element'

export const PlayerControls = { name: 'PlayerControls' }

/**
 * Game Status Component
 */
PlayerControls.render = function render ({props}) {
  const {events} = props

  function handleQuit () {
    bus.emit(events.client.quitGame)
  }

  return dom('div', {class: 'PlayerControls'}, [
    dom('button', {class: 'Button', onClick: handleQuit}, 'Leave Game')
  ])
}

export default PlayerControls
