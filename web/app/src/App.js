import React, { Component } from 'react';
import getFeatures from './services/api';
import Upload from './Upload';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import LandingPage from './components/pages/Landing';
import LoginPage from './components/pages/Login';
import DashboardPage from './components/pages/Dashboard';
import AuthService from './services/AuthService';

const auth = new AuthService('l4pxejOXhTOV32BHrZxASIHHuNq4urwh', 'kingofthestack.auth0.com');

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  testApi() {
    getFeatures().then(res => {
      this.setState({message: res.data})
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <Router history={hashHistory}>
        <IndexRedirect to="/" />
        <Route path="/" component={LandingPage}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/dashboard" component={DashboardPage} onEnter={requireAuth}/>
      </Router>
    );
  }
}

        // <h1> Welcom to sqwak </h1>
        // <button onClick={this.testApi.bind(this)}>Test API</button>
        // <br />
        // {this.state.message}
        // <Upload/>
export default App;
