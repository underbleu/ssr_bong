import React from 'react'
import { renderToString } from 'react-dom/server'
import Home from '../client/components/Home'

// Seperate rendering logic for React-app with 
// to help clarify server process
export default () => {
  const content = renderToString(<Home />)

  return `
    <html>
      <head></head>
      <body>
        <div id="root">${content}</div>
        <script src="bundle.js"></script>
      </body>
    </html>
  `
}