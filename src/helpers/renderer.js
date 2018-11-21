import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import Routes from '../client/Routes'

/**
 * renderer.js: Seperate React rendering logic with server-side logic to help clarify server process
 * context: A plain JavaScript object. During the render, components can add properties to the object to store information about the render (Redirects, Error handling)
 * location: BrowserRouter can know current path, but StaticRouter need to be told what the current path is from request
 */

 export default (req, store) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={{}}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  )

  return `
    <html>
      <head></head>
      <body>
        <div id="root">${content}</div>
        <script>
          window.INITIAL_STATE = ${JSON.stringify(store.getState())}
        </script>
        <script src="bundle.js"></script>
      </body>
    </html>
  `
}