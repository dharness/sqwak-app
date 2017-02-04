import React, { Component } from 'react'
import trainIcon from './../../../assets/images/icons/train.svg'
import testIcon from './../../../assets/images/icons/predict.svg'
import publishIcon from './../../../assets/images/icons/star.svg'
import PublishForm from './PublishForm.js'
import TestModel from './testModel/TestModel.js'
import * as actions from './../../../actions';
import { trainModel } from './../../../actions/mlApps';
import { connect } from 'react-redux';


class SubNav extends Component {

  openPublishModal() {
    this.props.showModal((
      <PublishForm />
    ))
  }

  openTestModal() {
    this.props.showModal((
      <TestModel />
    ))
  }

  componentDidMount() {
    this.props.showModal((
      <TestModel />
    ))
  }

  onTrainButtonClicked() {
    this.props.trainModel(this.props.currentMlAppId);
  }
  
  render() {
    return (
      <div className="sq-subnav">
        <div className="sq-subnav--app-name">
          {this.props.appName}
        </div>

        <div className="sq-subnav--buttons">
          <div className="sq-subnav--button" onClick={this.onTrainButtonClicked.bind(this)}>
            <img className="sq-subnav--icon" src={trainIcon} role="presentation"/>
            train
          </div>

          <div className="sq-subnav--button" onClick={this.openTestModal.bind(this)}>
            <img className="sq-subnav--icon" src={testIcon} role="presentation"/>
            test
           </div>
           
          <div className="sq-subnav--button" onClick={this.openPublishModal.bind(this)}>
            <img className="sq-subnav--icon" src={publishIcon} role="presentation"/>
            publish
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentMlAppId: state.currentMlAppId
})

export default connect(
  mapStateToProps,
  { ...actions, trainModel }
)(SubNav)