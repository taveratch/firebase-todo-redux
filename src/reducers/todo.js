import _ from 'lodash'

let initialState = {
  todo: [],
  sections: []
}

import {
  LOAD_TODO_FAILED,
  LOAD_TODO_REQUEST,
  LOAD_TODO_SUCCESS
} from 'constants/todo'

export default (state = initialState, action) => {
  let newState = _.merge({}, state)
  switch(action.type) {
    case LOAD_TODO_SUCCESS:
      newState.todo = action.payload
      newState.sections = _.map(action.payload, 'name')
      return newState
    case LOAD_TODO_REQUEST:
    case LOAD_TODO_FAILED:
      return state
    default:
      return state
  }
}

export const getTodoById = (state, id) => {
  return state.todo.todo.find((section) => section.id+'' === id) || []
}
