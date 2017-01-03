import _ from 'lodash'
import {format} from 'date-fns'
import {loadInternalData} from 'javascripts/internal-data'
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
  ITEM_CHECKED_CHANGE
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
      todo.todos = validateCheckedFromCookie(todo.todos, id)
      todo.todos.sort(sortByTimestamp)
      return newState
    case ITEM_CHECKED_CHANGE:
      let todoItem = getTodoItem(newState.todo, action.payload.sectionId, action.payload.itemId) //get todo item
      todoItem.checked = action.payload.checked // change checked status
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
  array.sort(sortByTimestamp) //reverse the sections
  _.map(array, (section) => {
    section.todos = typeof section.todos === 'undefined' ? [] : section.todos //fill in `undefined todos` with empty array
    section.dateStr = dateFormat(section.timestamp)
    section.timeStr = timeFormat(section.timestamp)
    section.todos = validateCheckedFromCookie(section.todos, section.id)
    section.todos.sort(sortByTimestamp) //reverse todos
  })
  return array
}

const validateCheckedFromCookie = (todos, sectionId) => {
  let internalData = loadInternalData()
  _.map(todos, (todoItem) => {
    let internalDataKey = sectionId + todoItem.id
    let checked = internalData[internalDataKey] || {checked: false} // receive object {checked: boolean}
    todoItem.checked = checked.checked
  })
  return todos
}
const dateFormat = (timestamp) => {
  let date = new Date(timestamp)
  return format(date, 'D MMM YYYY')
}

const timeFormat = (timestamp) => {
  let date = new Date(timestamp)
  return format(date, 'h:m a')
}

export const getTodoById = (todo, id) => {
  return todo.find((section) => (id === section.id)) || {}
}

export const getTodoItem = (sections, sectionId, itemId) => {
  let section = sections.find(section => section.id === sectionId)
  let todos = section.todos
  let todoItem = todos.find(item => item.id === itemId)
  return todoItem
}

export const sortByTimestamp = (a, b) => {
  return b.timestamp - a.timestamp
}

export const getUncheckedCount = (todos) => {
  return _.chain(todos)
          .map('checked')
          .countBy(Boolean)
          .value()
          .true || 0 //if undefined means no true then return 0
}
