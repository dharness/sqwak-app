import React, {Component} from 'react';
import { connect } from 'react-redux';
import PlushButton from './../../shared/PlushButton';


class ConfirmDelete extends Component {
  render () {
    return (
      <div className="sq-confirm-delete-form">
        <div className="sq-confirm-delete-form--content">
          <div className="sq-text sq-text__xl">Delete app</div>
          <div className="sq-text sq-text__lg">Woa woa, deleting this app will remove all classes and samples forever.. You sure pal?</div>
          <PlushButton buttonText={"Yes, delete this app"} onClick={this.props.onSubmit} colorClass="sq-button__red" isLoading={this.props.removeAppPending}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
    const { removeAppPending } = state.statuses;
    return { removeAppPending };
}

export default connect(
    mapStateToProps,
    {}
)(ConfirmDelete)