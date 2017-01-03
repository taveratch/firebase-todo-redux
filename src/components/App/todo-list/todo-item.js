import React, {Component} from 'react'

class TodoItem extends Component {
  render() {
    let checked = this.props.checked ? 'checked' : ''
    return (
      <li className="collection-item blue-text">
        <div className="flex flex-middle">
          <form>
            <input type="checkbox" onChange={this.props.onChange} className="margin-right" id={`todo-item-${this.props.itemKey}`} checked={checked}/>
            <label htmlFor={`todo-item-${this.props.itemKey}`}>{this.props.todo.name}</label>
          </form>
        </div>
      </li>
    )
  }
}

export default TodoItem
