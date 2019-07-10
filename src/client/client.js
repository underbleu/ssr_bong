// Startup point for the client side application
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import axios from 'axios'
import Routes from './Routes'
import reducers from './reducers'

/**
 * Customize behavior of Axios depending on whether we are running on the client or the server
 * 
 * Create custom Axios instance and Inject into thunk
 * Whenever we try to make network request,
 * we receive that customize Axios instance rather than import the actual module itself
 * So we can freely make request without worrying whether we are running it on the server or client
 */

const axiosInstance = axios.create({
  baseURL: '/api', // Automatically prepend '/api' on to the baseURL
})

const store = createStore(
  reducers,
  window.INITIAL_STATE, // Use Server-redux data to initialize Client-redux
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(axiosInstance))), // injecting a custom Axios instance
)

/**
 * hydrate(): Same as render(), but is used to hydrate a container whose HTML contents were rendered by ReactDOMServer
 * then React will attempt to attach event listeners to the existing markup
 * to treat mismatches between serverDOM and clientDOM as bugs and fix them
 */

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
)
