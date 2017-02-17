import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import trainIcon from './../../../assets/images/icons/train.svg'
import testIcon from './../../../assets/images/icons/predict.svg'
import publishIcon from './../../../assets/images/icons/star.svg'
import PublishForm from './PublishForm.js'
import TestModel from './testModel/TestModel.js'
import * as actions from './../../../actions';
import { trainModel } from './../../../actions/mlApps';
import { connect } from 'react-redux';
import Tooltip from 'rc-tooltip';


class SubNav extends Component {

  constructor() {
    super();
    this.state = { isTraining: false };
  }

  openPublishModal() {
    this.props.showModal((
      <PublishForm />
    ))
  }

  openTestModal() {
    browserHistory.push({
      pathname: browserHistory.getCurrentLocation().pathname,
      search: '?modal=test'
    });
    this.props.showModal((
      <TestModel />
    ));
  }

  componentDidMount() {
    if (this.props.openModal === "test") {
      this.openTestModal();
    }
  }

  onTrainButtonClicked() {
    this.setState({isTraining: true});
    setTimeout(()=> {
      this.setState({isTraining: false});
    }, 2000);
    let appId = this.props.currentMlAppId;
    let userId = this.props.userId;
    this.props.trainModel({userId, appId});
  }
  
  render() {
    return (
      <div className="sq-subnav">
        <div className="sq-subnav--content">
          <div className="sq-subnav-left-wrapper">
            <Tooltip
                overlayClassName={"sq-tooltip-overlay" + (true ? "" : " trained")}
                placement="top"
                mouseEnterDelay={0}
                mouseLeaveDelay={0.1}
                overlay={
                    <div
                        className={"sq-subnav--status-tooltip" + (true ? "" : " trained")}>
                        {true ? "Model edited" : "All trained!"}
                    </div>}
                align={{ offset: [0, 0] }}
                >
                <div className="sq-subnav--status-indicator"></div> 
            </Tooltip>
            <div className="sq-subnav--app-name">
              {this.props.appName}              
            </div>
          </div>

          <div className="sq-subnav--buttons">
            <div className="sq-subnav--button" onClick={this.onTrainButtonClicked.bind(this)}>
              <img className="sq-subnav--icon" src={trainIcon} role="presentation"/>
              Train
            </div>

            <div className="sq-subnav--button" onClick={this.openTestModal.bind(this)}>
              <img className="sq-subnav--icon" src={testIcon} role="presentation"/>
              Test
            </div>
            
            <div className="sq-subnav--button" onClick={this.openPublishModal.bind(this)}>
              <img className="sq-subnav--icon" src={publishIcon} role="presentation"/>
              Publish
            </div>
          </div>
        </div>
        <div className={"sq-subnav--progress-bar" + (this.state.isTraining ? " animate" : "")}></div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentMlAppId: state.currentMlAppId,
  userId: state.user.id
})

export default connect(
  mapStateToProps,
  { ...actions, trainModel }
)(SubNav)