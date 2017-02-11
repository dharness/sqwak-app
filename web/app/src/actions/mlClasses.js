import * as api from './../services/api';


export const createMlClass = (mlClassData) => {
  return (dispatch) => {
    dispatch({ type: 'FILES_UPLOADING' });
    api.createClass(mlClassData).then( mlClass => {

      const formattedMlClass = {
        className: mlClass.class_name,
        createdAt: mlClass.created_at,
        updatedAt: mlClass.updated_at,
        id: mlClass.id,
        isEdited: mlClass.is_edited,
        packageName: mlClass.package_name,
        inModel: mlClass.in_model
      };

      dispatch({
        type: 'ADD_ML_CLASS',
        mlAppId: mlClassData.appId,
        mlClass: formattedMlClass
      });
      dispatch({ type: 'FILES_UPLOADED' });
      dispatch({ type: 'CLOSE_MODAL' });
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
        inModel: mlClass.in_model
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