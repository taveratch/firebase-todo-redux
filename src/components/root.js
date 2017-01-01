import {Provider} from 'react-redux'
import configureStore from './configureStore'
import React from 'react'
import Routes from './routes'
import { syncHistoryWithStore } from 'react-router-redux'
import {browserHistory} from 'react-router'
import {init as firebaseInit, listening as firebaseListening} from 'javascripts/firebase'

export default class Root extends React.Component {
  constructor(props) {
    super(props)
    firebaseInit()
    this.store = configureStore(browserHistory)
    firebaseListening(this.store)
  }
  render() {
    return (
      <Provider store={this.store}>
        <Routes history={syncHistoryWithStore(browserHistory, this.store)}/>
      </Provider>
    )
  }
}
