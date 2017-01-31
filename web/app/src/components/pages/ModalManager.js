import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../actions';
import FullPageModal from './../shared/FullPageModal';


class ModalManager extends Component {

  render() {
    return (
      <div>
        <FullPageModal
          isOpen={this.props.modal.component}
          onCloseEvent={this.props.closeModal}
          component={this.props.modal.component}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let {modal} = state;
  return { modal }
};

export default connect(
  mapStateToProps,
 actions
)(ModalManager)