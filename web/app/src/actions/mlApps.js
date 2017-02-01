import {fetchApps, deleteApp, createApp} from './../services/api';


export const loadApps = () => {
  return (dispatch) => {
    dispatch({ type: 'FETCH_APPS_PENDING' });
    fetchApps().then(mlApps => {
        mlApps.forEach(mlApp => {
            dispatch({
                type: 'ADD_APP',
                mlApp,
            });
        });
        dispatch({ type: 'FETCH_APPS_RESOLVED' });
    });
  }
};

export const addApp = (mlAppData) => {
  return (dispatch) => {
    createApp(mlAppData).then(mlApp => {
      dispatch({
          type: 'ADD_APP',
          mlApp,
      });
      dispatch({ type: 'CLOSE_MODAL' });
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