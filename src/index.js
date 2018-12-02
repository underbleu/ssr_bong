import 'babel-polyfill'
import express from 'express'
import { matchRoutes } from 'react-router-config'
import proxy from 'express-http-proxy'
import Routes from './client/Routes'
import renderer from './helpers/renderer'
import createStore from './helpers/createStore'

const app = express()

/**
 * 1. Any request begins with '/api', send it to the proxy server
 * - proxyReqOptDecorator: Override request options before issuing the proxyRequest
 * - x-forwarded-host: After login, Identifying the original host requested by the client and redirect to it(not to api URL)
 */
app.use('/api', proxy('http://react-ssr-api.herokuapp.com', {
  proxyReqOptDecorator(opts) {
    opts.headers['x-forwarded-host'] = 'localhost:3000'
    return opts
  }
}))

// 2. Set "public" as a static file directory.
// then, we don't need to specify directory on <script src="bundle.js">
app.use(express.static('public'))

app.get('*', (req, res) => {
  const store = createStore(req)
  /**
   * matchRoutes
   * 1. useful on the server for preloading data
   * 2. Before rendering the next page, load up all the data with "loading indicator"
   */
  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    return route.loadData ? route.loadData(store) : null // loadData functions will have reference to server side redux store
  })

  // After all data loading finished, Render the application
  Promise.all(promises).then(() => {
    res.send(renderer(req, store)) // req: Let StaticRouter know current path
  })
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})