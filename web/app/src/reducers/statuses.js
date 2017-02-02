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

    case 'FILES_UPLOADING': {
      return Object.assign({}, state, {
        areFilesUploading: true
      });
    }

    case 'FILES_UPLOADED': {
      return Object.assign({}, state, {
        areFilesUploading: false
      });
    }

    default:
      return state
  }
}

export default statuses