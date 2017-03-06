const currentMlAppId = (state = "", action) => {
  switch (action.type) {
    case 'SET_CURRENT_ML_APP_ID':
      return action.mlAppId;
    default:
      return state;
  }
};

export default currentMlAppId