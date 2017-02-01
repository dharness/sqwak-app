import {fetchApps, deleteApp} from './../services/api';


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

export const removeApp = mlAppId => {
  return (dispatch) => {
    deleteApp(mlAppId).then(() => {
      dispatch({
        type: 'REMOVE_APP',
        id: mlAppId
      });
    });
  };
}