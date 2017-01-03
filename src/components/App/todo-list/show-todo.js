import React from 'react'
import {getTodoById} from 'reducers/todo'
import {createTodoItem, itemChecked} from 'actions/todo'
import _ from 'lodash'
import Loader from 'components/App/shared/loader'
import {connect} from 'react-redux'
import TodoItem from './todo-item'

class Todos extends React.Component {
  onSubmit = (e) => {
    e.preventDefault()
    let ref = this.refs['todo-name']
    let name = ref.value
    if(name === '') return
    this.props.createTodoItem(this.props.params.id, name)
    ref.value = ''
    window.$('.modal').modal('close')
  }
  componentDidMount() {
    window.$('.modal').modal()
  }
  onCheckedChange = (itemId, e) => { // when use .bind(this, arg), the parameters of function will be opposite = (arg, this)
    this.props.itemChecked(this.props.todo.id, itemId, e.target.checked)
  }
  render() {
    return (
      <div className="container">
        <ul className="collection with-header">
          <li className="collection-header"><h5>{this.props.todo.name}</h5></li>
          <Loader />
          {
            _.map(this.props.todo.todos || [], (todo,i) => <TodoItem todo={todo} itemKey={i} key={i} checked={todo.checked} onChange={this.onCheckedChange.bind(this, todo.id)}/>)
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

        <a style={{margin: "20px"}} href={"#add-todo-item-modal"} className="modal-trigger pull-right pull-bottom btn-floating btn-large waves-effect waves-light teal">
          <i className="material-icons">add</i>
        </a>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  todo: getTodoById(state.todo.todo, ownProps.params.id)
})


export default connect(mapStateToProps, {createTodoItem, itemChecked})(Todos)
