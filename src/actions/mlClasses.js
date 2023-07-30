import * as api from "./../services/api";

export const createMlClass = (mlClassData) => {
  let { userId, appId, className, files } = mlClassData;
  return (dispatch) => {
    dispatch({ type: "FILES_UPLOADING" });
    dispatch({ type: "UPLOAD_PROGESS", progress: 0 });
    api.createClass({ userId, appId, className }).then((mlClass) => {
      let filesUploaded = 0;
      let reqs = files.map((file) => {
        return api
          .addSampleToClass({ userId, appId, classId: mlClass.id, file })
          .then((res) => {
            let progress = ++filesUploaded / files.length;
            dispatch({
              type: "UPLOAD_PROGESS",
              progress,
            });
            return res;
          });
      });

      Promise.all(reqs).then((res) => {
        const formattedMlClass = {
          className: mlClass.class_name,
          createdAt: mlClass.created_at,
          updatedAt: mlClass.updated_at,
          id: mlClass.id,
          isEdited: mlClass.is_edited,
          packageName: mlClass.package_name,
          inModel: mlClass.in_model,
          imgName: mlClass.img_name,
          numSamples: 0,
        };
        dispatch({
          type: "ADD_ML_CLASS",
          mlAppId: appId,
          mlClass: formattedMlClass,
        });
        dispatch({ type: "FILES_UPLOADED" });
        dispatch({ type: "CLOSE_MODAL" });
        dispatch({
          type: "UPLOAD_PROGESS",
          progress: -1,
        });
      });
    });
  };
};

export const addSampleToClass = ({ userId, appId, classId, file }) => {
  return (dispatch) => {
    dispatch({ type: "ADD_SAMPLE_PENDING" });
    api.addSampleToClass({ userId, appId, classId, file }).then((res) => {
      console.log(res);
    });
  };
};

export const moveMlClass = ({ userId, appId, classId, to, from }) => {
  return (dispatch) => {
    dispatch({
      type: "MOVE_ML_CLASS",
      mlClassId: classId,
      mlAppId: appId,
    });
    api.moveClass({ userId, appId, classId, to, from }).then((mlApp) => {});
  };
};

export const updateMlClass = ({ userId, appId, classId, className, files }) => {
  return (dispatch) => {
    if (files.length > 0) {
      dispatch({ type: "UPLOAD_PROGESS", progress: 0 });
    }

    let filesUploaded = 0;
    let reqs = files.map((file) => {
      return api
        .addSampleToClass({ userId, appId, classId, file })
        .then((res) => {
          let progress = ++filesUploaded / files.length;
          dispatch({
            type: "UPLOAD_PROGESS",
            progress,
          });
          return res;
        });
    });
    reqs.push(api.renameClass({ userId, appId, classId, className }));
    Promise.all(reqs).then((res) => {
      let numSamples = Math.max.apply(
        Math,
        res.map((r) => (r.audio_samples ? r.audio_samples.length : 0))
      );
      dispatch({
        type: "UPDATE_ML_CLASS",
        mlClassId: classId,
        mlAppId: appId,
        className: className,
        isEdited: true,
        numSamples,
      });
      dispatch({ type: "CLOSE_MODAL" });
      dispatch({ type: "UPLOAD_PROGESS", progress: -1 });
    });
  };
};

export const copyPremadeClass = ({ appId, classId }) => {
  return (dispatch) => {
    dispatch({ type: "COPY_PREMADE_CLASS_PENDING", classId });
    api.copyPremadeClass({ appId, classId }).then((mlClass) => {
      const numSamples = mlClass.audio_samples
        ? mlClass.audio_samples.length
        : 0;
      const formattedMlClass = {
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
      dispatch({
        type: "ADD_ML_CLASS",
        mlAppId: appId,
        mlClass: formattedMlClass,
      });
      dispatch({ type: "COPY_PREMADE_CLASS_SUCCESS", classId });
    });
  };
};

export const deleteMlClass = ({ userId, mlAppId, mlClassId }) => {
  return (dispatch) => {
    const mlClassData = {
      appId: mlAppId,
      classId: mlClassId,
      userId,
    };
    api.deleteClass(mlClassData).then((res) => {
      dispatch({
        type: "REMOVE_ML_CLASS",
        mlAppId,
        mlClassId,
      });
      dispatch({ type: "CLOSE_MODAL" });
    });
  };
};
