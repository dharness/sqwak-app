import React, {Component} from 'react'
import { testModel } from './../../../../actions/mlApps';
import ButtonGroup from './../../../shared/ButtonGroup';
import getCurrentMlApp from './../../../../selectors/currentMlApp';
import RecordSoundPanel from './RecordSoundPanel';
import UploadFilePanel from './UploadFilePanel';
import ResultsPanel from './ResultsPanel';
import { connect } from 'react-redux';

class TestModel extends Component {

  constructor(props) {
    super(props);
    this.panels = [
      <RecordSoundPanel onSubmitTest={this.onSubmitTest.bind(this)}/>,
      <UploadFilePanel onSubmitTest={this.onSubmitTest.bind(this)}/>

    ];
    this.state = { selectedPanel: 1 };
  }

  onSubmitTest(file) {
    this.props.testModel({
      file,
      appId: this.props.currentMlAppId,
      userId: this.props.userId
    })
  }

  testApp() {
    this.props.testModel(this.props.currentMlAppId);
  }

  switchPanel(buttonIndex) {
    this.setState({selectedPanel: buttonIndex});
  }

  render () {
    return (
      <div className="sq-test-modal">
          <div className="sq-test-buttons--wrapper">
            <ButtonGroup
              selectedId={this.state.selectedPanel}
              buttonTexts={['Record', 'Upload']}
              onButtonSelected={this.switchPanel.bind(this)}
            />
          </div>
          <div className="sq-test-modal--wrapper">
            {this.panels[this.state.selectedPanel]}
            <ResultsPanel jsonResponse={this.props.jsonResponse}/>
          </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const currentMlApp = getCurrentMlApp(state);
  return {
    jsonResponse: currentMlApp.jsonResponse || {},
    currentMlAppId: state.currentMlAppId,
    userId: state.user.id
  }
}

export default connect(
  mapStateToProps,
  { testModel }
)(TestModel)