const userApps = (state = [], action) => {
  switch (action.type) {
    case 'ADD_APP':
      return [
        ...state,
        {
          id: action.id,
          appName: action.appName
        }
      ]
    case 'REMOVE_APP':
      return state.filter(app => app.id !== action.id);
    default:
      return state
  }
}

export default userApps