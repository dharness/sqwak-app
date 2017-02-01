import React, { Component } from 'react';
import { connect } from 'react-redux';
import Warning1 from './../shared/Warning1';
import * as actions from './../../actions';


class WarningManager extends Component {

  onConfirmWarning(onConfirm, id) {
    onConfirm();
    this.props.closeWarning(id);
  }

  render() {
    return (
      <div>
        {this.props.warnings.map((warning, i) => {
          return (
            <Warning1 
              key={i}
              id={i} 
              message={warning.message} 
              onConfirm={() => {this.onConfirmWarning(warning.onConfirm, i)}} 
              onClose={() => {this.props.closeWarning(i)}}>
            </Warning1>
          )
        })}
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
