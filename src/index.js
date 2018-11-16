import express from 'express'
import renderer from './helpers/renderer'

const app = express()

// Set "public" as a static file directory
// then, we don't need to specify directory on <script src="bundle.js">
app.use(express.static('public'))
app.get('/', (requestAnimationFrame, res) => {
  res.send(renderer())
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})