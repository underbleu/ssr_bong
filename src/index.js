import 'babel-polyfill'
import express from 'express'
import renderer from './helpers/renderer'
import createStore from './helpers/createStore'

const app = express()

// Set "public" as a static file directory
// then, we don't need to specify directory on <script src="bundle.js">
app.use(express.static('public'))
app.get('*', (req, res) => {
  const store = createStore()

  // Some logic to initialize and load data into the store

  res.send(renderer(req, store)) // req: Let StaticRouter know current path
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})