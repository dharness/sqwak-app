import * as api from './../services/api';


export const loadApps = () => {
  return (dispatch) => {
    dispatch({ type: 'FETCH_APPS_PENDING' });
    api.fetchApps().then(mlApps => {
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
    api.createApp(mlAppData).then(mlApp => {
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
    api.deleteApp(mlAppId).then(() => {
      dispatch({
        type: 'REMOVE_APP',
        id: mlAppId
      });
    });
  };
}

export const trainModel = mlAppId => {
  return (dispatch) => {
    api.trainModel(mlAppId).then((res) => {
      console.log(res);
    }).catch(err => {
      console.log('err');
      console.log(err);
    });
  };
}

export const testModel = mlAppId => {
  return (dispatch) => {
    api.testModel(mlAppId).then((res) => {
      console.log(res);
    }).catch(err => {
      console.log('err');
      console.log(err);
    });
  };
}