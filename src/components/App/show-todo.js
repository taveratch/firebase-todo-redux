import React from 'react'
import {getTodoById} from 'reducers/todo'
import _ from 'lodash'
import {connect} from 'react-redux'
class Todos extends React.Component {
  render() {
    return (
      <div>
        {
          _.map(this.props.todo.todos, (todo) => todo.name)
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  todo: getTodoById(state, ownProps.params.id)
})

export default connect(mapStateToProps)(Todos)
