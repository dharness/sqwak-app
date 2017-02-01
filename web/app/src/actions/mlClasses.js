import { createClass } from './../services/api';


export const createMlClass = (mlClassData) => {
  return (dispatch) => {
    createClass(mlClassData).then((mlClass) => {
      dispatch({
        type: 'ADD_ML_CLASS',
        mlClass
      });
      dispatch({ type: 'CLOSE_MODAL' });
    });
  };
}