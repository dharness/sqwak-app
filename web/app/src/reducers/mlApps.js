const mlApps = (state = {}, action) => {
  switch (action.type) {

    case 'ADD_APP':
      var nextState = Object.assign({}, state);
      var mlApp = {
        id: action.id,
        appName: action.appName,
        mlClasses: action.mlClasses
      };
      nextState[action.id] = mlApp;
      return nextState;

    case 'REMOVE_APP':
      var nextState = Object.assign({}, state);
      delete nextState[action.id];
      return nextState;

    default:
      return state
  }
}

export default mlApps