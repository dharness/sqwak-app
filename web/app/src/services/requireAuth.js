import AuthService from './AuthService';

const auth = new AuthService('l4pxejOXhTOV32BHrZxASIHHuNq4urwh', 'kingofthestack.auth0.com');

// validate authentication for private routes
const requireAuth = (nextState, replace) => {

  const hashString = nextState.location.hash;
  const idString = '&id_token';
  const firstIndex = hashString.indexOf(idString) + idString.length + 1;
  const lastIndex = hashString.indexOf('&token_type=');
  const idToken = hashString.substring(firstIndex, lastIndex);
  if (idToken && idToken !== "") {
    localStorage.setItem('id_token', hashString.substring(firstIndex, lastIndex));
  }

  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

export default requireAuth