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
                inModel: mlClass.in_model,
                imgName: mlClass.img_name
            }
        });
        mlApp.isPublished = mlApp.is_published;
        mlApp.workingModelDirty = mlApp.working_model_dirty;
        delete mlApp.is_published
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
            mlApp.mlClasses = mlApp.ml_classes;
            mlApp.isPublished = mlApp.is_published;
            mlApp.workingModelDirty = mlApp.working_model_dirty;
            delete mlApp.is_published;
            delete mlApp.ml_classes;
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
      mlApp.mlClasses = mlApp.ml_classes;
      mlApp.workingModelDirty = mlApp.working_model_dirty;
      delete mlApp.ml_classes;
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
      dispatch({
        type: 'SET_CLASSES_EDITED',
        mlAppId: appId,
        isEdited: false
      });
    }).catch(err => {
      console.log('err');
      console.log(err);
    });
  };
}

export const testModel = ({userId, appId, file}) => {
  return (dispatch) => {
    dispatch({ type: 'TEST_MODEL_PENDING' });
    api.testModel(({userId, appId, file})).then(res => {
      dispatch({
        type: 'SET_JSON_RESPONSE',
        mlAppId: appId,
        jsonResponse: res
      });
      dispatch({ type: 'TEST_MODEL_SUCCESS' });
    }).catch(err => {
      console.log('err');
      console.log(err);
    });
  };
}

export const publishModel = ({userId, appId}) => {
  return (dispatch) => {
    api.publishModel(({userId, appId})).then((res) => {
      console.log(res);
      dispatch({ type: 'CLOSE_MODAL' });
    }).catch(err => {
      console.log('err');
      console.log(err);
    });
  };
}