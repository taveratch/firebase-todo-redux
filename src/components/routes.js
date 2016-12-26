import {Router, Route, IndexRoute} from 'react-router'
import App from './App'
import React from 'react'
import ShowTodo from './App/show-todo'
import Todos from './App/todos'
export default (props) => (
  <Router {...props}>
    <Route path='/'>
      <IndexRoute component={App} />
      <Route path='section' component={Todos}>
        <Route path=':id' component={ShowTodo}/>
      </Route>
    </Route>

  </Router>
)
