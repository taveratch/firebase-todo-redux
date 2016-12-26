import {Provider} from 'react-redux'
import configureStore from './configureStore'
import React from 'react'
import Routes from './routes'
import { syncHistoryWithStore } from 'react-router-redux'
import {browserHistory} from 'react-router'
import {init as firebaseInit} from 'javascripts/firebase'

export default class Root extends React.Component {
  constructor(props) {
    super(props)
    firebaseInit()
  }
  render() {
    const store = configureStore(browserHistory)
    return (
      <Provider store={store}>
        <Routes history={syncHistoryWithStore(browserHistory, store)}/>
      </Provider>
    )
  }
}
