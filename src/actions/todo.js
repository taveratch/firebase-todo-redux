import {getSectionsDB, getTodoDB} from 'javascripts/firebase'
import {push} from 'react-router-redux'

import {
  LOAD_TODO_FAILED,
  LOAD_TODO_REQUEST,
  LOAD_TODO_SUCCESS,
  LOAD_SINGLE_TODO_REQUEST,
  LOAD_SINGLE_TODO_SUCCESS,
  LOAD_SINGLE_TODO_FAILED,
} from 'constants/todo'

const receiveSections = (sections) => (
  {
    type: LOAD_TODO_SUCCESS,
    payload: sections
  }
)

const receiveTodos = (todos) => (
  {
    type: LOAD_SINGLE_TODO_SUCCESS,
    payload: todos
  }
)

export const loadSections = () => {
  // return function that accept dispatch
  return (dispatch) => {
    // tell reducer that request has been sent
    dispatch({
      type: LOAD_TODO_REQUEST
    })
    // load section from database
    getSectionsDB()
      .then(sections => dispatch(receiveSections(sections.val()))) // If success the pass the result to the reducer
      .catch(error => dispatch({type: LOAD_TODO_FAILED, payload: error})) //otherwise, pass the error instead
  }
}

export const loadSingleTodos = (id) => {
  return (dispatch) => {
    dispatch({
      type: LOAD_SINGLE_TODO_REQUEST
    })
    getTodoDB(id)
      .then((todo) => {
        dispatch(push(`/section/${id}`))
        return dispatch(receiveTodos(todo.val()))
      })
      .catch( error => dispatch({type: LOAD_SINGLE_TODO_FAILED, payload: error}))
  }
}
