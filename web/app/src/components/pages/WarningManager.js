import React, { Component } from 'react';
import { connect } from 'react-redux';
import Warning1 from './../shared/Warning1';

class WarningManager extends Component {

  render() {
    return (
      <div>
        <Warning1/>
      </div>
    )
  }
}

export default WarningManager