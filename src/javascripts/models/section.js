import todoModel from './todo'
export default (id, name) => ({
  id: id,
  name: name,
  todos: [todoModel('Sample')]
})
