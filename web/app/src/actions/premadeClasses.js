import * as api from './../services/api';


export const loadPremadeClasses = () => {
  return (dispatch) => {
    api.fetchPremadeClasses().then(premadeClasses => {
      dispatch({
        type: 'SET_PREMADE_CLASSES',
        premadeClasses
      })
    });
  }
};