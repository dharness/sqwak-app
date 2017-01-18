import React, { Component } from 'react';
import './App.css';
import getFeatures from './services/api';

class App extends Component {

  getBlogs() {
    getFeatures().then(e => {
      console.log(e);
    }).catch(r => {
      console.log(r);
    });
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.getBlogs}>Get Blogs</button>
      </div>
    );
  }
}

export default App;
