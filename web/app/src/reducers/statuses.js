const defaultStatuses = {
  isFetchingApps: true,
  isLoginPending: false,
  areFilesUploading: false,
  testModelPending: false,
  removeAppPending: false,
  publishModelPending: false,
  fileUploadProgress: -1
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

    case 'UPLOAD_PROGESS': {
      return Object.assign({}, state, {
        fileUploadProgress: action.progress
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

    case 'LOGIN_USER_PENDING': {
      return Object.assign({}, state, {
        isLoginPending: true
      });
    }

    case 'LOGIN_USER_SUCCESS': {
      return Object.assign({}, state, {
        isLoginPending: false
      });
    }

    case 'TEST_MODEL_PENDING': {
      return Object.assign({}, state, {
        testModelPending: true
      });
    }

    case 'TEST_MODEL_SUCCESS': {
      return Object.assign({}, state, {
        testModelPending: false
      });
    }

    case 'PUBLISH_MODEL_PENDING': {
      return Object.assign({}, state, {
        publishModelPending: true
      });
    }

    case 'PUBLISH_MODEL_SUCCESS': {
      return Object.assign({}, state, {
        publishModelPending: false
      });
    }

    case 'REMOVE_APP_PENDING': {
      return Object.assign({}, state, {
        removeAppPending: true
      });
    }

    case 'REMOVE_APP_SUCCESS': {
      return Object.assign({}, state, {
        removeAppPending: false
      });
    }

    default:
      return state
  }
}

export default statuses