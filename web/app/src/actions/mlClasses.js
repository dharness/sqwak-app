import { createClass, deleteClass } from './../services/api';


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