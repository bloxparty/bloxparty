import dom from 'virtual-element'
import {render, tree} from 'deku'
import {storePlugin} from 'deku-redux'
import configureStore from './store'
import App from './app'

const store = configureStore()
const app = tree(dom(App, {store}))

app.use(storePlugin(store))

store.subscribe(() => {
  app.set(store.getState())
})

render(app, document.body)
