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
    browserHistory.push({
      pathname: browserHistory.getCurrentLocation().pathname,
      search: '?modal=publish'
    });
    this.props.showModal((
      <PublishForm mlAppName={this.props.appName}/>
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
    } else if (this.props.openModal === "publish") {
      this.openPublishModal();
    }
  }

  renderIndicator() {
    let className = 'sq-subnav--status-indicator' + (this.props.modelIsEdited ? "" : " published");
    
    return (
      <div className={className}></div> 
    )
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

  handleNavButtonClick(clickable, fn) {
    if (clickable) { fn.bind(this).call(); }
  }
  
  render() {

    let canTrain = this.props.modelIsEdited && (this.props.mlModel.mlClasses.length > 0);
    let canTest = true;
    let canPublish = true;

    return (
      <div className="sq-subnav">
        <div className="sq-subnav--content">
          <div className="sq-subnav-left-wrapper">
            <Tooltip
                overlayClassName={"sq-tooltip-overlay" + (this.props.modelIsEdited ? "" : " trained")}
                placement="top"
                mouseEnterDelay={0}
                mouseLeaveDelay={0.1}
                overlay={
                    <div
                        className={"sq-subnav--status-tooltip" + (this.props.modelIsEdited ? "" : " trained")}>
                        {this.props.modelIsEdited ? "Model edited" : "All trained!"}
                    </div>}
                align={{ offset: [0, 0] }}
                >
                {this.renderIndicator()}
            </Tooltip>
            <div className="sq-subnav--app-name">
              {this.props.appName}              
            </div>
          </div>

          <div className="sq-subnav--buttons">
            <div
              className={"sq-subnav--button" + (canTrain ? "" : " disabled")}
              onClick={()=>{this.handleNavButtonClick(canTrain, this.onTrainButtonClicked)}}>
              <img className="sq-subnav--icon" src={trainIcon} role="presentation"/>
              <div className="sq-subnav--button-text">
                Train
              </div>
            </div>

            <div
              className={"sq-subnav--button" + (canTest ? "" : " disabled")}
              onClick={()=>{this.handleNavButtonClick(canTest, this.openTestModal)}}>
              <img className="sq-subnav--icon" src={testIcon} role="presentation"/>
              <div className="sq-subnav--button-text">
                Test
              </div>
            </div>
            
            <div
              className={"sq-subnav--button" + (canPublish ? "" : " disabled")}
              onClick={()=>{this.handleNavButtonClick(canPublish, this.openPublishModal)}}>
              <img className="sq-subnav--icon" src={publishIcon} role="presentation"/>
              <div className="sq-subnav--button-text">
                Publish
              </div>
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