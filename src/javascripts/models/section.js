import todoModel from './todo'
export default (id, name, timestamp) => ({
  id: id,
  name: name,
  todos: [],
  timestamp: timestamp
})
