import React from 'react'
import {getTodoById} from 'reducers/todo'
import {createTodoItem} from 'actions/todo'
import _ from 'lodash'
import Loader from 'components/App/shared/loader'
import {connect} from 'react-redux'
import AddButton from 'components/App/shared/add-button'
class Todos extends React.Component {
  onSubmit = (e) => {
    e.preventDefault()
    let ref = this.refs['todo-name']
    let name = ref.value
    this.props.createTodoItem(this.props.params.id, name)
    ref.value = ''
    window.$('.modal').modal('close')
  }
  componentDidMount() {
    window.$('.modal').modal()
  }
  onClick = () => {

  }
  render() {
    return (
      <div className="container">
        <ul className="collection with-header">
          <li className="collection-header"><h5>{this.props.todo.name}</h5></li>
          <Loader />
          {
            _.map(this.props.todo.todos || [], (todo,i) => <a key={i} className="collection-item red-text">{todo.name}</a>)
          }
        </ul>

        <div id="add-todo-item-modal" className="modal bottom-sheet">
          <div className="modal-content">
            <h5 style={{marginBottom: 30}}>Add new todo</h5>
            <form className="margin-top" onSubmit={this.onSubmit}>
              <div className="input-field">
                <input ref="todo-name" id="todo-name" placeholder="Add new todo item" className="validate" type="text"/>
                <label htmlFor="todo-name">Add new todo item</label>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button onClick={this.onSubmit} className=" modal-action modal-close waves-effect waves-green btn-flat">Add</button>
          </div>
        </div>

        <AddButton href="#add-todo-item-modal" onClick={this.onClick}/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  todo: getTodoById(state, ownProps.params.id)
})


export default connect(mapStateToProps, {createTodoItem})(Todos)
