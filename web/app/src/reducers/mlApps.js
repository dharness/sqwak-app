const mlApps = (state = {}, action) => {
  switch (action.type) {

    case 'ADD_APP': {
      const nextState = Object.assign({}, state);
      nextState[action.mlApp._id] = action.mlApp;
      return nextState;
    }

    case 'REMOVE_APP': {
      const nextState = Object.assign({}, state);
      delete nextState[action.id];
      return nextState;
    }

    case 'ADD_ML_CLASS': {
      const nextState = Object.assign({}, state);
      const currentMlApp = nextState[action.mlAppId];
      currentMlApp.workingModel.mlClasses.push(action.mlClass);
      nextState[action.mlAppId] = currentMlApp;
      return nextState;
    }

    case 'REMOVE_ML_CLASS': {
      const nextState = Object.assign({}, state);
      const currentMlApp = nextState[action.mlAppId];
      currentMlApp.workingModel.mlClasses = currentMlApp.workingModel.mlClasses
        .filter(mlClass => mlClass._id !== action.mlClassId);
      nextState[action.mlAppId] = currentMlApp;
      return nextState;
    }

    default:
      return state
  }
}

export default mlApps