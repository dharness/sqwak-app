const mlApps = (state = [], action) => {
  switch (action.type) {

    case 'ADD_APP':
      var mlAppIndex = state.findIndex(app => app.id === action.id);
      var mlApp = {
        id: action.id,
        appName: action.appName,
        mlClasses: action.mlClasses
      };
      // If the app already exists, just update it instead
      if (mlAppIndex >= 0) {
        var nextState = state.slice();
        nextState[mlAppIndex] = mlApp;
        return nextState;
      }

      // Otherwise, just add the app to the state
      return [ ...state, mlApp ];

    case 'REMOVE_APP':
      return state.filter(mlApp => mlApp.id !== action.id);
    default:
      return state
  }
}

export default mlApps