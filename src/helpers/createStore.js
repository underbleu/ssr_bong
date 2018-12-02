import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk'
import axios from 'axios'
import reducers from '../client/reducers'

const env = process.env.NODE_ENV

export default (req) => {
  const axiosInstance = axios.create({
    baseURL: 'http://react-ssr-api.herokuapp.com',
    headers: { cookie: req.get('cookie') || '' },
  })

  const store = createStore(
    reducers,
    {},
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument(axiosInstance)))
  )

  return store
}
