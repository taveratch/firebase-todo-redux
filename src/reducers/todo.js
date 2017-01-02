import _ from 'lodash'
let initialState = {
  todo: [],
  isLoading: true,
  singleTodo: []
}

import {
  LOAD_TODO_FAILED,
  LOAD_TODO_REQUEST,
  LOAD_TODO_SUCCESS,
  LOAD_SINGLE_TODO_REQUEST,
  LOAD_SINGLE_TODO_SUCCESS,
  LOAD_SINGLE_TODO_FAILED,
} from 'constants/todo'

export default (state = initialState, action) => {
  let newState = _.merge({}, state)
  switch(action.type) {
    case LOAD_TODO_SUCCESS:
      newState.todo = action.payload
      newState.isLoading = false
      return newState
    case LOAD_SINGLE_TODO_SUCCESS:
      let id = action.payload.id
      newState.isLoading = false
      let todo = getTodoById(newState.todo, id)
      todo.todos = action.payload.todos || []
      todo.todos.reverse() //reverse each item
      return newState
    case LOAD_SINGLE_TODO_REQUEST:
    case LOAD_TODO_REQUEST:
      newState.isLoading = true
      return newState
    case LOAD_TODO_FAILED:
      return state
    default:
      return state
  }
}

export const validateSections = (sections) => {
  let array = _.filter(sections, (section) => { return true }) //convert object with key to array
  array.reverse() //reverse the sections
  _.map(array, (section) => {
    section.todos = typeof section.todos === 'undefined' ? [] : section.todos //fill in `undefined todos` with empty array
    section.todos.reverse() //reverse todos
  })
  return array
}

export const getTodoById = (todo, id) => {
  return todo.find((section) => (id === section.id)) || {}
}
