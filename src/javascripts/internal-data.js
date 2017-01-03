import cookie from 'js-cookie'
import {getTodoItem} from 'reducers/todo'

export const loadInternalData = () => {
  return cookie.getJSON('data') || {}
}

export const saveCheckedChange = (sectionId, itemId, checked) => {
  let data = loadInternalData()
  let todoItem = data[sectionId+itemId] || {}
  todoItem.checked = checked
  data[sectionId+itemId] = todoItem
  cookie.set('data', data)
  return true
}
