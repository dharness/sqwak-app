const userApps = (state = [], action) => {
  switch (action.type) {
    case 'ADD_APP':

      let appIndex = state.findIndex(app => app.id === action.id);
      let app = {
        id: action.id,
        appName: action.appName,
        classes: []
      };
      // If the app already exists, just update it instead
      if (appIndex >= 0) {
        let nextState = state.slice();
        nextState[appIndex] = app;
        return nextState;
      }

      // Otherwise, just add the app to the state
      return [
        ...state,
        app
      ]
    case 'REMOVE_APP':
      return state.filter(app => app.id !== action.id);
    case 'ADD_CLASS_TO_APP':
      let currentAppIndex = state.findIndex(app => app.id === action.appId);
      let currentApp = Object.assign({}, state[currentAppIndex]);
      currentApp.classes.push(action.mlClass);
      let apps = state.slice();
      apps[currentAppIndex] = currentApp;
      return apps;
    default:
      return state
  }
}

export default userApps