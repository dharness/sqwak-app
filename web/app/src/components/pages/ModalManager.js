import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../actions';
import FullPageModal from './../shared/FullPageModal';


class ModalManager extends Component {

  onClose() {
    if (this.props.statuses.areFilesUploading) {
        this.props.showWarning({
          message: `Are you sure you want to quit while your files are uploading?`,
          onConfirm: () => { this.props.closeModal() }
        })
    } else {
      this.props.closeModal();
    }
  }

  render() {
    return (
      <div>
        <FullPageModal
          isOpen={this.props.modal.component}
          onCloseEvent={this.onClose.bind(this)}
          component={this.props.modal.component}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let {modal, statuses} = state;
  return { modal, statuses}
};

export default connect(
  mapStateToProps,
 actions
)(ModalManager)