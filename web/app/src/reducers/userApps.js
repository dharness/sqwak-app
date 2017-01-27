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
    default:
      return state
  }
}

export default userApps