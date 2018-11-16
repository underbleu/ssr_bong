import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import Routes from '../client/Routes'

// renderer.js: Seperate React rendering logic with server-side logic to help clarify server process
// context: A plain JavaScript object. During the render, components can add properties to the object to store information about the render (Redirects, Error handling)
// location: BrowserRouter can know current path, but StaticRouter need to be told what the current path is from request
export default (req) => {
  const content = renderToString(
    <StaticRouter location={req.path} context={{}}>
      <Routes />
    </StaticRouter>
  )

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