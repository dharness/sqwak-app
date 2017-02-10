const defaultUser = {
  id: null,
  ml_app_ids: []
};

const statuses = (state = defaultUser, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER': {
      return Object.assign({}, state, {
        id: action.id,
        ml_app_ids: action.ml_app_ids
      });
    }

    default:
      return state
  }
}

export default statuses