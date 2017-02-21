import * as api from './../services/api';


export const createMlClass = (mlClassData) => {
  let { userId, appId, className, files } = mlClassData;
  return (dispatch) => {
    dispatch({ type: 'FILES_UPLOADING' });
    dispatch({ type: 'UPLOAD_PROGESS', progress: 0 });
    api.createClass({ userId, appId, className}).then( mlClass => {
      let filesUploaded = 0;
      let reqs = files.map(file => {
        return api.addSampleToClass({ userId, appId, classId: mlClass.id, file }).then(res => {
          let progress = ++filesUploaded /files.length;
          dispatch({
            type: 'UPLOAD_PROGESS',
            progress
          });
          return res;
        });
      });

      Promise.all(reqs).then(res => {
        const formattedMlClass = {
          className: mlClass.class_name,
          createdAt: mlClass.created_at,
          updatedAt: mlClass.updated_at,
          id: mlClass.id,
          isEdited: mlClass.is_edited,
          packageName: mlClass.package_name,
          inModel: mlClass.in_model,
          imgName: mlClass.img_name,
          numSamples: res.pop().audio_samples.length
        };
        dispatch({
          type: 'ADD_ML_CLASS',
          mlAppId: appId,
          mlClass: formattedMlClass
        });
        dispatch({ type: 'FILES_UPLOADED' });
        dispatch({ type: 'CLOSE_MODAL' });
        dispatch({
          type: 'UPLOAD_PROGESS',
          progress: -1
        });
      })

    });
  };
}

export const addSampleToClass = ({ userId, appId, classId, file }) => {
  return (dispatch) => {
    dispatch({ type: 'ADD_SAMPLE_PENDING' });
    api.addSampleToClass({ userId, appId, classId, file }).then( res => {
      console.log(res)
    });
  };
}


export const moveMlClass = ({userId, appId, classId, to, from}) => {
  return (dispatch) => {
    dispatch({
      type:'MOVE_ML_CLASS',
      mlClassId: classId,
      mlAppId: appId
    });
    api.moveClass({userId, appId, classId, to, from}).then( mlApp => {});
  };
}

export const renameMlClass = ({userId, appId, classId, className}) => {
  return (dispatch) => {
    dispatch({
      type:'RENAME_ML_CLASS',
      mlClassId: classId,
      mlAppId: appId,
      className: className,
      isEdited: true
    });
    api.renameClass({userId, appId, classId, className}).then( () => {
      dispatch({ type: 'CLOSE_MODAL' });
    });
  };
}

export const copyPremadeClass = ({ appId, classId }) => {
  return (dispatch) => {
    api.copyPremadeClass({ appId, classId }).then((mlClass) => {
      const formattedMlClass = {
        className: mlClass.class_name,
        createdAt: mlClass.created_at,
        updatedAt: mlClass.updated_at,
        id: mlClass.id,
        isEdited: mlClass.is_edited,
        packageName: mlClass.package_name,
        inModel: mlClass.in_model,
        imgName: mlClass.img_name
      };
      dispatch({
        type: 'ADD_ML_CLASS',
        mlAppId: appId,
        mlClass: formattedMlClass
      });
    });
  };
}

export const deleteMlClass = ({userId, mlAppId, mlClassId}) => {
  return (dispatch) => {
    const mlClassData = {
      appId: mlAppId,
      classId: mlClassId,
      userId
    };
    api.deleteClass(mlClassData).then( res => {
      dispatch({
        type: 'REMOVE_ML_CLASS',
        mlAppId,
        mlClassId
      });
      dispatch({ type: 'CLOSE_MODAL' });
    });
  };
}