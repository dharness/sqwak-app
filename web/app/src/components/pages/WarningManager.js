import React, { Component } from 'react';
import { connect } from 'react-redux';
import Warning from './../shared/Warning';
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
    if (warnings.length > 0) {
      const index = warnings.length -1;
      return  <Warning 
                message={warnings[index].message} 
                onConfirm={() => {this.onConfirmWarning(warnings[index].onConfirm, index)}} 
                onClose={() => {this.props.closeWarning(index)}}>
              </Warning>
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
