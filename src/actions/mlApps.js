import * as api from "./../services/api";

export const loadApp = (userId, appId) => {
  return (dispatch) => {
    dispatch({ type: "FETCH_APPS_PENDING" });
    api.fetchApp({ userId, appId }).then((mlApp) => {
      mlApp.mlClasses = mlApp.ml_classes.map((mlClass) => {
        const numSamples = mlClass.num_samples || 0;
        return {
          className: mlClass.class_name,
          createdAt: mlClass.created_at,
          updatedAt: mlClass.updated_at,
          id: mlClass.id,
          isEdited: mlClass.is_edited,
          packageName: mlClass.package_name,
          inModel: mlClass.in_model,
          imgName: mlClass.img_name,
          numSamples,
        };
      });
      mlApp.lastPublished = mlApp.last_published;
      mlApp.workingModelDirty = mlApp.working_model_dirty;
      delete mlApp.last_published;
      delete mlApp.ml_classes;
      delete mlApp.working_model_dirty;
      delete mlApp.working_model;
      delete mlApp.published_model;
      dispatch({
        type: "ADD_APP",
        mlApp,
      });
      dispatch({ type: "FETCH_APPS_RESOLVED" });
    });
  };
};

export const loadApps = (userId) => {
  return (dispatch) => {
    dispatch({ type: "FETCH_APPS_PENDING" });
    api.fetchApps(userId).then((mlApps) => {
      mlApps.forEach((mlApp) => {
        mlApp.mlClasses = mlApp.ml_classes;
        mlApp.lastPublished = mlApp.last_published;
        mlApp.workingModelDirty = mlApp.working_model_dirty;
        mlApp.numSamples = mlApp.num_samples;
        delete mlApp.last_published;
        delete mlApp.ml_classes;
        delete mlApp.working_model_dirty;
        delete mlApp.working_model;
        delete mlApp.published_model;
        delete mlApp.num_samples;
        dispatch({
          type: "ADD_APP",
          mlApp,
        });
      });
      dispatch({ type: "FETCH_APPS_RESOLVED" });
    });
  };
};

export const addApp = ({ userId, appName }) => {
  return (dispatch) => {
    api.createApp({ userId, appName }).then((mlApp) => {
      mlApp.mlClasses = mlApp.ml_classes;
      mlApp.workingModelDirty = mlApp.working_model_dirty;
      delete mlApp.ml_classes;
      dispatch({
        type: "ADD_APP",
        mlApp,
      });
      dispatch({ type: "CLOSE_MODAL" });
    });
  };
};

export const removeApp = ({ userId, appId }) => {
  return (dispatch) => {
    dispatch({ type: "REMOVE_APP_PENDING" });
    api.deleteApp({ userId, appId }).then(() => {
      dispatch({
        type: "REMOVE_APP",
        id: appId,
      });
      dispatch({ type: "REMOVE_APP_SUCCESS" });
      dispatch({ type: "CLOSE_MODAL" });
    });
  };
};

export const trainModel = ({ userId, appId }) => {
  return (dispatch) => {
    api
      .trainModel({ userId, appId })
      .then((res) => {
        dispatch({
          type: "SET_CLASSES_EDITED",
          mlAppId: appId,
          isEdited: false,
        });
      })
      .catch((err) => {
        console.log("err");
        console.log(err);
      });
  };
};

export const testModel = ({ userId, appId, file }) => {
  return (dispatch) => {
    dispatch({ type: "TEST_MODEL_PENDING" });
    api
      .testModel({ userId, appId, file })
      .then((res) => {
        dispatch({
          type: "SET_JSON_RESPONSE",
          mlAppId: appId,
          jsonResponse: res,
        });
        dispatch({ type: "TEST_MODEL_SUCCESS" });
      })
      .catch((err) => {
        console.log("err");
        console.log(err);
      });
  };
};

export const publishModel = ({ userId, appId }) => {
  return (dispatch) => {
    dispatch({ type: "PUBLISH_MODEL_PENDING" });
    api
      .publishModel({ userId, appId })
      .then((res) => {
        console.log(res);
        dispatch({ type: "PUBLISH_MODEL_SUCCESS" });
      })
      .catch((err) => {
        console.log("err");
        console.log(err);
      });
  };
};
