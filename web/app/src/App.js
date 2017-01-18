import React, { Component } from 'react';
import './App.css';
import getFeatures from './services/api';

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
      <div className="App">
        <button onClick={this.testApi.bind(this)}>Test API</button>
        <br />
        {this.state.message}
      </div>
    );
  }
}

export default App;
