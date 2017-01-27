const userApps = (state = [], action) => {
  switch (action.type) {
    case 'ADD_APP':

      let appIndex = state.findIndex(app => app.id === action.id);
      // If the app already exists, just update it instead
      if (appIndex >= 0) {
        let nextState = state.slice();
        nextState[appIndex] = {
          id: action.id,
          appName: action.appName          
        };
        return nextState;
      }

      // Otherwise, just add the app to the state
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