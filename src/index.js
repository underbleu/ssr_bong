import 'babel-polyfill'
import express from 'express'
import { matchRoutes } from 'react-router-config'
import Routes from './client/Routes'
import renderer from './helpers/renderer'
import createStore from './helpers/createStore'

const app = express()

// Set "public" as a static file directory
// then, we don't need to specify directory on <script src="bundle.js">
app.use(express.static('public'))
app.get('*', (req, res) => {
  const store = createStore()

  /**
   * matchRoutes
   * 1. useful on the server for preloading data
   * 2. Before rendering the next page, load up all the data with "loading"
   */
  matchRoutes(Routes, req.path).map(({ route }) => {
    return route.loadData ? route.loadData() : null
  })

  res.send(renderer(req, store)) // req: Let StaticRouter know current path
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})