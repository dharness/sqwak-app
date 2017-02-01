import { createClass } from './../services/api';


export const createMlClass = (mlClassData) => {
  return (dispatch) => {
    createClass(mlClassData).then((res) => {
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