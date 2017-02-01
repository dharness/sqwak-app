export const closeModal = () => ({
  type: 'CLOSE_MODAL'
});

export const closeWarning = (warningId) => ({
  type: 'CLOSE_WARNING',
  warningId
});

export const showWarning = warning => ({
  type: 'SHOW_WARNING',
  warning
})

export const showModal = component =>({
  type: 'SHOW_MODAL',
  component
});

export const setCurrentMlApp = mlAppId =>({
  type: 'SET_CURRENT_ML_APP_ID',
  mlAppId
});

export const addApp = mlApp => {
  return (dispatch) => {
    dispatch({
        type: 'ADD_APP',
        appName: mlApp.appName,
        mlClasses: mlApp.model.classes,
        id: mlApp._id
    });
  }
};