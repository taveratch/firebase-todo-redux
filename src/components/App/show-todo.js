import React from 'react'
import {getTodoById} from 'reducers/todo'
import {createTodoItem} from 'actions/todo'
import _ from 'lodash'
import {connect} from 'react-redux'
class Todos extends React.Component {
  onSubmit = (e) => {
    e.preventDefault()
    let name = this.refs['todo-name'].value
    this.props.createTodoItem(this.props.params.id, name)
  }
  render() {
    return (
      <div>
        {
          _.map(this.props.todo.todos || [], (todo) => todo.name)
        }
        <form onSubmit={this.onSubmit}>
          <input ref="todo-name"/>
          <button>create item</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  todo: getTodoById(state, ownProps.params.id)
})


export default connect(mapStateToProps, {createTodoItem})(Todos)
