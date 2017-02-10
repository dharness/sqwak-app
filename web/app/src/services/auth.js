const tokenStorageKey = 'SQWAK_ID_TOKEN';

function setToken(token) {
  localStorage.setItem(tokenStorageKey, token);
}

function getToken() {
  return localStorage.getItem(tokenStorageKey);
}

function removeToken() {
  localStorage.removeItem(tokenStorageKey);
}

function requireAuth(nextState, replace) {
  if (!getToken()) {
    replace({ pathname: '/login' })
  }
}

export {
    setToken,
    getToken,
    removeToken,
    requireAuth
}