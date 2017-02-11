import * as api from './../services/api';


export const loadApp = (userId, appId) => {
  return (dispatch) => {
    dispatch({ type: 'FETCH_APPS_PENDING' });
    api.fetchApp({userId, appId}).then(mlApp => {
        mlApp.mlClasses = mlApp.ml_classes.map(mlClass => {
            return {
                className: mlClass.class_name,
                createdAt: mlClass.created_at,
                updatedAt: mlClass.updated_at,
                id: mlClass.id,
                isEdited: mlClass.is_edited,
                packageName: mlClass.package_name,
                inModel: mlClass.in_model
            }
        });
        delete mlApp.ml_classes
        dispatch({
            type: 'ADD_APP',
            mlApp,
        });
        dispatch({ type: 'FETCH_APPS_RESOLVED' });
    });
  }
};

export const loadApps = (userId) => {
  return (dispatch) => {
    dispatch({ type: 'FETCH_APPS_PENDING' });
    api.fetchApps(userId).then(mlApps => {
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

export const addApp = ({userId, appName}) => {
  return (dispatch) => {
    api.createApp({userId, appName}).then(mlApp => {
      dispatch({
          type: 'ADD_APP',
          mlApp,
      });
      dispatch({ type: 'CLOSE_MODAL' });
    });
  }
};

export const removeApp = ({userId, appId}) => {
  return (dispatch) => {
    api.deleteApp({userId, appId}).then(() => {
      dispatch({
        type: 'REMOVE_APP',
        id: appId
      });
    });
  };
}

export const trainModel = ({userId, appId}) => {
  return (dispatch) => {
    api.trainModel({userId, appId}).then((res) => {
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