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
      newState.todo[id].todos = action.payload.todos || []
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

export const getTodoById = (state, id) => {
  return state.todo.todo[id] || {}
}
