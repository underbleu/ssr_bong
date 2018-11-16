import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import Home from './client/components/Home'

const app = express()

// Set "public" as a static file directory
// then, we don't need to specify directory on <script src="bundle.js">
app.use(express.static('public'))
app.get('/', (requestAnimationFrame, res) => {
  // Render as a string
  const content = renderToString(<Home />)

  const html = `
    <html>
      <head></head>
      <body>
        <div id="root">${content}</div>
        <script src="bundle.js"></script>
      </body>
    </html>
  `
  res.send(html)
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})