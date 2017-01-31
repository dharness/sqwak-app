import {fetchApps} from './../services/api';



export const closeModal = reddit => ({
  type: 'CLOSE_MODAL'
});

export const showModal = component =>({
  type: 'SHOW_MODAL',
  component
});

export const setCurrentMlApp = mlAppId =>({
  type: 'SET_CURRENT_ML_APP_ID',
  mlAppId
});

export const loadApps = () => {
  return (dispatch) => {
    fetchApps().then(mlApps => {
        mlApps.forEach(mlApp => {
            dispatch({
                type: 'ADD_APP',
                appName: mlApp.appName,
                mlClasses: mlApp.model.classes,
                id: mlApp._id
            });
        });
    });
  }
};

export const addApp = mlApp => {
  return (dispatch) => {
    dispatch({
        type: 'ADD_APP',
        appName: mlApp.appName,
        mlClasses: mlApp.model.classes,
        id: mlApp._id
    });
  }
};

export const removeApp = mlappId =>({
  type: 'REMOVE_APP',
  id: mlappId
});

export const addMlClass = mlClass =>({
  type: 'ADD_ML_CLASS',
  mlClass
});