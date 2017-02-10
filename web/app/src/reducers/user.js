const defaultUser = {
  id: null
};

const statuses = (state = defaultUser, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER': {
      return Object.assign({}, state, {
        id: action.id
      });
    }

    default:
      return state
  }
}

export default statuses