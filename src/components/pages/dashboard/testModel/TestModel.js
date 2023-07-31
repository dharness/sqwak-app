import React, { Component } from "react";
import { testModel } from "./../../../../actions/mlApps";
import PlushButton from "./../../../shared/PlushButton";
import getCurrentMlApp from "./../../../../selectors/currentMlApp";
import RecordSoundPanel from "./RecordSoundPanel";
import UploadFilePanel from "./UploadFilePanel";
import ResultsPanel from "./ResultsPanel";
import { connect } from "react-redux";

class TestModel extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedPanel: 1, files: [] };
  }

  onSubmitTest(file) {
    this.props.testModel({
      file,
      appId: this.props.currentMlAppId,
      userId: this.props.userId,
    });
  }

  testApp() {
    this.props.testModel(this.props.currentMlAppId);
  }

  switchPanel(buttonIndex) {
    this.setState({ selectedPanel: buttonIndex });
  }

  onFilesChanged({ files }) {
    this.setState({ files: [...this.state.files, ...files] });
  }

  renderSelectedPanel(index) {
    return [
      <RecordSoundPanel
        onSubmitTest={this.onSubmitTest.bind(this)}
        isLoading={this.props.testModelPending}
      />,
      <UploadFilePanel
        onFilesChanged={this.onFilesChanged.bind(this)}
        isLoading={this.props.testModelPending}
      />,
    ][index];
  }

  render() {
    return (
      <div className="sq-test-modal">
        <div className="sq-text__xl sq-test-modal--title"> Test your app </div>
        <div className="sq-test-modal--wrapper">
          <div className="sq-test-modal--input">
            <div className="sq-test-buttons--wrapper">
              <button
                className={
                  "sq-test--button sq-text__md" +
                  (this.state.selectedPanel === 0 ? " active" : "")
                }
                onClick={() => {
                  this.switchPanel(0);
                }}
              >
                Record
              </button>
              <button
                className={
                  "sq-test--button sq-text__md" +
                  (this.state.selectedPanel === 1 ? " active" : "")
                }
                onClick={() => {
                  this.switchPanel(1);
                }}
              >
                Upload
              </button>
            </div>
            <div className="sq-test-modal--input-contents">
              {this.renderSelectedPanel(this.state.selectedPanel)}
            </div>
            <div className="sq-test-modal--input-button">
              <PlushButton
                onClick={() => {
                  this.onSubmitTest(this.state.files[0]);
                }}
                disabled={this.state.files.length <= 0}
                isLoading={this.props.testModelPending}
                colorClass={"sq-button__blue"}
                buttonText={"Predict"}
              />
            </div>
          </div>
          <ResultsPanel
            jsonResponse={this.props.jsonResponse}
            isLoading={this.props.testModelPending}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const currentMlApp = getCurrentMlApp(state);
  let testModelPending = state.statuses.testModelPending;
  return {
    testModelPending,
    jsonResponse: currentMlApp.jsonResponse || {},
    currentMlAppId: state.currentMlAppId,
    userId: state.user.id,
  };
};

export default connect(mapStateToProps, { testModel })(TestModel);
