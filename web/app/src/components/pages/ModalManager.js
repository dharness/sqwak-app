import React, { Component } from 'react';
import { connect } from 'react-redux';
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
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    closeModal(component) {
      dispatch({
        type: 'CLOSE_MODAL'
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalManager)