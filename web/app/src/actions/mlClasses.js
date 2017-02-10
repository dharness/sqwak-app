import { createClass, deleteClass, moveClass } from './../services/api';


export const createMlClass = (mlClassData) => {
  return (dispatch) => {
    dispatch({ type: 'FILES_UPLOADING' });
    createClass(mlClassData).then( res => {
      const mlClass = JSON.parse(res.srcElement.responseText);
      dispatch({
        type: 'ADD_ML_CLASS',
        mlAppId: mlClassData.appId,
        mlClass
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
    moveClass({userId, appId, classId, to, from}).then( mlApp => {});
  };
}

export const deleteMlClass = ({mlAppId, mlClassId}) => {
  return (dispatch) => {
    const mlClassData = {
      appId: mlAppId,
      classId: mlClassId
    };
    deleteClass(mlClassData).then( res => {
      dispatch({
        type: 'REMOVE_ML_CLASS',
        mlAppId,
        mlClassId
      });
      dispatch({ type: 'CLOSE_MODAL' });
    });
  };
}