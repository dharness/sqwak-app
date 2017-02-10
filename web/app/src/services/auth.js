const tokenStorageKey = 'SQWAK_ID_TOKEN';

function setToken(token) {
  localStorage.setItem(tokenStorageKey, token);
}

function getToken() {
  localStorage.getItem(tokenStorageKey);
}

export {
    setToken,
    getToken
}