import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import LandingPage from './pages/Landing';
import LoginPage from './pages/Login';
import DashboardPage from './pages/dashboard/Dashboard';
import NotFoundPage from './pages/NotFound';
import AuthService from './../services/AuthService';

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

class App extends Component {

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={LandingPage}/>
        <Route path="/login" component={() => (<LoginPage auth={auth} />)}/>
        <Route path="/dashboard" component={DashboardPage} onEnter={requireAuth}/>
        <Route path="*" component={NotFoundPage} />
      </Router>
    );
  }
}
export default App;
