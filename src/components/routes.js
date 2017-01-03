import {Router, Route, IndexRoute} from 'react-router'
import App from './App'
import React from 'react'
import ShowTodo from './App/todo-list/show-todo'
export default (props) => (
  <Router {...props}>
    <Route path='/'>
      <IndexRoute component={App} />
      <Route path='section'>
        <Route path=':id' component={ShowTodo}/>
      </Route>
    </Route>
  </Router>
)
