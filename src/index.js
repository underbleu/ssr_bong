const express = require('express')
const React = require('react')
const renderToString = require('react-dom/server').renderToString
const Home = require('./client/components/Home').default
const app = express()

app.get('/', (requestAnimationFrame, res) => {
  // Render as a string
  const content = renderToString(<Home />)
  res.send(content)
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})