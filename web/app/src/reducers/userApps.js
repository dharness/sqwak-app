const userApps = (state = [], action) => {
  switch (action.type) {

    case 'ADD_APP':
      var appIndex = state.findIndex(app => app.id === action.id);
      var app = {
        id: action.id,
        appName: action.appName,
        classes: action.classes
      };
      // If the app already exists, just update it instead
      if (appIndex >= 0) {
        var nextState = state.slice();
        nextState[appIndex] = app;
        return nextState;
      }

      // Otherwise, just add the app to the state
      return [ ...state, app ]

    case 'REMOVE_APP':
      return state.filter(app => app.id !== action.id);
    default:
      return state
  }
}

export default userApps