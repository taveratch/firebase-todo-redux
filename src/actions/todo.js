import {getSectionsDB} from 'javascripts/firebase'
import {push} from 'react-router-redux'

import {
  LOAD_TODO_FAILED,
  LOAD_TODO_REQUEST,
  LOAD_TODO_SUCCESS
} from 'constants/todo'

const receiveSections = (sections) => (
  {
    type: LOAD_TODO_SUCCESS,
    payload: sections
  }
)

export const loadSections = () => {
  return (dispatch) => {
    dispatch({
      type: LOAD_TODO_REQUEST
    })
    getSectionsDB()
      .then(
        (sections) => dispatch(receiveSections(sections.val())),
        (error) => dispatch({type: LOAD_TODO_FAILED, payload: error})
      )
  }
}

export const loadTodos = (id) => {
  return (dispatch) => {
    dispatch(push(`/section/${id}`))
  }
}
