/*global electronRequire*/
import bus from 'bus'

export default function IPC (app) {
  if (!window || !window.process || !window.process.versions['electron']) return
  app.set('electron', true)
  let ipc = electronRequire('ipc')

  bus.on('ipc:quit', function () {
    console.log('sending')
    ipc.send('quit')
  })
}
