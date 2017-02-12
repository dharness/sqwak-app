const mlApps = (state = {}, action) => {
  switch (action.type) {

    case 'ADD_APP': {
      const nextState = Object.assign({}, state);
      nextState[action.mlApp.id] = action.mlApp;
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
      currentMlApp.mlClasses.push(action.mlClass);
      nextState[action.mlAppId] = currentMlApp;
      return nextState;
    }

    case 'REMOVE_ML_CLASS': {
      const nextState = Object.assign({}, state);
      const currentMlApp = nextState[action.mlAppId];
      currentMlApp.mlClasses = currentMlApp.mlClasses
        .filter(mlClass => mlClass.id !== action.mlClassId);
      nextState[action.mlAppId] = currentMlApp;
      return nextState;
    }

    case 'MOVE_ML_CLASS': {
      const nextState = Object.assign({}, state);
      const currentMlApp = nextState[action.mlAppId];
      const mlClassIndex = currentMlApp.mlClasses
        .findIndex(mlClass => mlClass.id === action.mlClassId);
      const mlClassToMove = currentMlApp.mlClasses[mlClassIndex];
      mlClassToMove.inModel = !mlClassToMove.inModel;
      return nextState;
    }

    case 'RENAME_ML_CLASS': {
      const nextState = Object.assign({}, state);
      const currentMlApp = nextState[action.mlAppId];
      currentMlApp.mlClasses.forEach((mlClass) => {
        if (mlClass.id === action.mlClassId)
          mlClass.className = action.className
      });
      
      nextState[action.mlAppId] = currentMlApp;
      return nextState
    }


    default:
      return state
  }
}

export default mlApps