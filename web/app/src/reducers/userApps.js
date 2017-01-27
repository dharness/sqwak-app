const userApp = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state
      }

      return {
        ...state,
        completed: !state.completed
      }
    default:
      return state
  }
}

const userApps = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        userApp(undefined, action)
      ]
    case 'TOGGLE_TODO':
      return state.map(t =>
        userApp(t, action)
      )
    default:
      return state
  }
}

export default userApps