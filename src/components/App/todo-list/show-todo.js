import React from 'react'
import {getTodoById} from 'reducers/todo'
import {createTodoItem} from 'actions/todo'
import _ from 'lodash'
import Loader from 'components/App/shared/loader'
import {connect} from 'react-redux'
class Todos extends React.Component {
  onSubmit = (e) => {
    e.preventDefault()
    let name = this.refs['todo-name'].value
    this.props.createTodoItem(this.props.params.id, name)
  }
  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit}>
          <div className="input-field">
            <input ref="todo-name" id="todo-name" placeholder="Add new todo item" className="validate" type="text"/>
            <label htmlFor="todo-name">Add new todo item</label>
          </div>
        </form>
      <Loader />
        <div className="collection">
          {
            _.map(this.props.todo.todos || [], (todo,i) => <a key={i} className="collection-item">{todo.name}</a>)
          }
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  todo: getTodoById(state, ownProps.params.id)
})


export default connect(mapStateToProps, {createTodoItem})(Todos)
