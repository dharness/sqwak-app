import React, {Component} from 'react'
import { testModel } from './../../../../actions/mlApps';
import ButtonGroup from './../../../shared/ButtonGroup';
import RecordSoundPanel from './RecordSoundPanel';
import UploadFilePanel from './UploadFilePanel';
import { connect } from 'react-redux';

class TestModel extends Component {

  constructor(props) {
    super(props);
    this.panels = [
      <RecordSoundPanel onSubmitTest={this.onSubmitTest.bind(this)}/>,
      <UploadFilePanel onSubmitTest={this.onSubmitTest.bind(this)}/>

    ];
    this.state = {
      selectedPanel: 0
    };
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
      <div>
          <div className="sq-test-buttons--wrapper">
            <ButtonGroup
              buttonTexts={['Record', 'Upload']}
              onButtonSelected={this.switchPanel.bind(this)}
            />
          </div>
          {this.panels[this.state.selectedPanel]}
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
  { testModel }
)(TestModel)