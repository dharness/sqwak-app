import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actions from './../../actions';
import FullPageModal from './../shared/FullPageModal';


class ModalManager extends Component {

  constructor(props) {
    super(props);
    this.state = {remountKey: 0}
  }

  onClose() {
    if (this.props.statuses.areFilesUploading) {
        this.props.showWarning({
          message: `Are you sure you want to quit while your files are uploading?`,
          onConfirm: () => { this.props.closeModal() }
        })
    } else {
      browserHistory.push({
        pathname: browserHistory.getCurrentLocation().pathname,
        search: ""
      })
      this.props.closeModal();
      this.setState({
        remountKey: ++this.state.remountKey
      })
    }
  }

  render() {
    return (
      <div>
        <FullPageModal
           key={this.state.remountKey}
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