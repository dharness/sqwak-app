import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import LandingPage from './pages/Landing';
import LoginPage from './pages/Login';
import ModalManager from './pages/ModalManager';
import WarningManager from './pages/WarningManager';
import DashboardPage from './pages/dashboard/Dashboard';
import UserApps from './pages/userapps/UserApps';
import NotFoundPage from './pages/NotFound';
import AuthService from './../services/AuthService';
import requireAuth from './../services/requireAuth';

const auth = new AuthService('l4pxejOXhTOV32BHrZxASIHHuNq4urwh', 'kingofthestack.auth0.com');


class App extends Component {

  render() {
    return (
      <div className="sq-full-page">
        <WarningManager />
        <ModalManager />
        <Router history={browserHistory}>
          <Route path="/" component={LandingPage}/>
          <Route path="/login" component={() => (<LoginPage auth={auth} />)}/>
          <Route path="/dashboard/:appId" component={DashboardPage} onEnter={requireAuth}/>
          <Route path="/apps" component={() => (<UserApps store={this.props.store} />)} onEnter={requireAuth}/>
          <Route path="*" component={NotFoundPage} />
        </Router>
      </div>
    );
  }
}
export default App;
