import {getSectionsDB, getTodoDB, addSection, addTodoItem} from 'javascripts/firebase'
import {push} from 'react-router-redux'
import {validateSections} from 'reducers/todo'
import {
  LOAD_TODO_FAILED,
  LOAD_TODO_REQUEST,
  LOAD_TODO_SUCCESS,
  LOAD_SINGLE_TODO_REQUEST,
  LOAD_SINGLE_TODO_SUCCESS,
  LOAD_SINGLE_TODO_FAILED,
  CREATE_SECTION_REQUEST,
  CREATE_TODO_REQUEST,
  ITEM_CHECKED_CHANGE
} from 'constants/todo'
import {saveCheckedChange} from 'javascripts/internal-data'

const receiveSections = (sections) => (
  {
    type: LOAD_TODO_SUCCESS,
    payload: validateSections(sections)
  }
)

const receiveParticularSection = (section) => (
  {
    type: LOAD_SINGLE_TODO_SUCCESS,
    payload: validateSections([section])[0]
  }
)

const getSection = (dispatch) => {
  getSectionsDB()
    .then(sections => dispatch(receiveSections(sections.val()))) // If success the pass the result to the reducer
    .catch(error => dispatch({type: LOAD_TODO_FAILED, payload: error})) //otherwise, pass the error instead
}

export const loadSections = () => {
  console.log('load sections');
  // return function that accept dispatch
  return (dispatch) => {
    // tell reducer that request has been sent
    dispatch({
      type: LOAD_TODO_REQUEST
    })
    // load section from database
    getSection(dispatch)
  }
}

export const loadSingleTodos = (id) => {
  console.log('load single todo');
  return (dispatch) => {
    dispatch({
      type: LOAD_SINGLE_TODO_REQUEST
    })
    return getTodoDB(id)
      .then((todo) => {
        dispatch(receiveParticularSection(todo.val()))
        dispatch(push(`/section/${id}`))
      })
      .catch( error => dispatch({type: LOAD_SINGLE_TODO_FAILED, payload: error}))
  }
}

export const createSection = (name) => {
  return (dispatch) => {
    dispatch({
      type: CREATE_SECTION_REQUEST
    })
    addSection(name)
      .then((res) => {
        // load section from database
        getSection(dispatch)
      })
      .catch( error => {console.log(error) })
  }
}

export const createTodoItem = (id, name) => {
  return (dispatch) => {
    dispatch({
      type: CREATE_TODO_REQUEST
    })
    addTodoItem(id, name)
      .then(res => {
        // load section from database
        getSection(dispatch)
      })
      .catch(error => {
        console.log(error)
      })
   }
}

export const itemChecked = (sectionId, itemId, checked) => {
  return (dispatch) => {
    saveCheckedChange(sectionId, itemId, checked)
    dispatch({
      type: ITEM_CHECKED_CHANGE,
      payload: {sectionId, itemId, checked}
    })
  }
}
