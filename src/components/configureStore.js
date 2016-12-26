import {createStore, applyMiddleware} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'
import reducers from 'reducers'

export default (history) => {
  let middlewares = [thunk, routerMiddleware(history)]
  let store = createStore(reducers, applyMiddleware(...middlewares))
  return store
}
