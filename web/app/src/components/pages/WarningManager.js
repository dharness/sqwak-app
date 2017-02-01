import React, { Component } from 'react';
import { connect } from 'react-redux';
import Warning1 from './../shared/Warning1';
import * as actions from './../../actions';


class WarningManager extends Component {

  constructor(props) {
    super(props);
    this.state =  {
      currentWarning: {}
    }
  }

  getNextWarning() {
    const warnings = this.props.warnings
    const id = warnings.length -1;
    if (id >=0 ) {
      return  <Warning1 
                message={warnings[id].message} 
                onConfirm={() => {this.onConfirmWarning(warnings[id].onConfirm, id)}} 
                onClose={() => {this.props.closeWarning(id)}}>
              </Warning1>
    }
  }

  onConfirmWarning(onConfirm, id) {
    onConfirm();
    this.props.closeWarning(id);
  }

  render() {
      return (
        <div>
          {this.getNextWarning()}
        </div>
      )
  }
}

const mapStateToProps = (state, ownProps) => {
  let {warnings} = state;
  return { warnings }
};

export default connect(
  mapStateToProps,
  actions
)(WarningManager)
