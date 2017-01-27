let nextTodoId = 0
export const addUserApp = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
});