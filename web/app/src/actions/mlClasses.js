import { createClass, deleteClass, moveClass } from './../services/api';


export const createMlClass = (mlClassData) => {
  return (dispatch) => {
    createClass(mlClassData).then( res => {
      const mlClass = JSON.parse(res.srcElement.responseText);
      dispatch({
        type: 'ADD_ML_CLASS',
        mlAppId: mlClassData.appId,
        mlClass
      });
      dispatch({ type: 'CLOSE_MODAL' });
    });
  };
}


export const moveMlClass = ({appId, classId, to, from}) => {
  return (dispatch) => {
    moveClass({appId, classId, to, from}).then( mlApp => {
      dispatch({
        type: 'ADD_APP',
        mlApp
      });
    });
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