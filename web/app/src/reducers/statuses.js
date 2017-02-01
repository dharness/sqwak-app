const defaultStatuses = {
  isFetchingApps: true
};

const statuses = (state = defaultStatuses, action) => {
  switch (action.type) {

    case 'FETCH_APPS_PENDING': {
      return Object.assign({}, state, {
        isFetchingApps: true
      });
    }

    case 'FETCH_APPS_RESOLVED': {
      return Object.assign({}, state, {
        isFetchingApps: false
      });
    }

    default:
      return state
  }
}

export default statuses